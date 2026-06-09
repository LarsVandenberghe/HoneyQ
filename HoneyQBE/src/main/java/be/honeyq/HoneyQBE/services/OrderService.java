package be.honeyq.HoneyQBE.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import be.honeyq.HoneyQBE.model.Article;
import be.honeyq.HoneyQBE.model.Order;
import be.honeyq.HoneyQBE.model.OrderDetail;
import be.honeyq.HoneyQBE.model.OrderStatus;
import be.honeyq.HoneyQBE.model.User;
import be.honeyq.HoneyQBE.repository.ArticleRepository;
import be.honeyq.HoneyQBE.repository.OrderDetailRepository;
import be.honeyq.HoneyQBE.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public Order addOrUpdateItemToCart(User user, Long articleId, Double amount) {
        var orders = this.orderRepository.findByUser(user);
        var currentCart = orders.stream().filter(o -> o.getStatus() == OrderStatus.CART).findFirst();

        var article = articleRepository.getReferenceById(articleId);
        var available = getAvailable(article);

        if (amount < 0){
            throw new IllegalArgumentException("Geen negatieve stock toegestaan.");
        }

        if (amount > 0 && available < amount){
            throw new IllegalArgumentException("Niet genoeg stock beschikbaar. Refresh je pagina en probeer opnieuw.");
        }

        Order cart = null;
        if (currentCart.isEmpty()) {
            cart = new Order(new HashSet<OrderDetail>(), user, OrderStatus.CART);
            cart = orderRepository.save(cart);
        } else {
            cart = currentCart.get();
        }
        
        var curentDetails = new ArrayList<>(cart.getOrderDetails());
        var articleAlreadyInDetail = curentDetails.stream().filter(cd -> cd.getArticle().getId() == articleId).findFirst();

        OrderDetail orderDetail = null;
        if (articleAlreadyInDetail.isPresent() && amount > 0) {
            orderDetail = articleAlreadyInDetail.get();
            orderDetail.setQuantity(amount);
            orderDetailRepository.save(orderDetail);
            return orderRepository.getReferenceById(cart.getId());

        } else if (articleAlreadyInDetail.isPresent() && amount <= 0) {
            var orderDetailId = articleAlreadyInDetail.get().getId();
            cart.getOrderDetails().remove(articleAlreadyInDetail.get());
            cart = orderRepository.save(cart);
            orderDetailRepository.deleteById(orderDetailId);;
            return cart;
        } else if (amount > 0) {
            orderDetail = new OrderDetail(article, cart, amount);
            orderDetail = orderDetailRepository.save(orderDetail);
            cart.getOrderDetails().add(orderDetail);
            return orderRepository.save(cart);
        }
        return orderRepository.getReferenceById(cart.getId());
    }

    public Order removeItemsFromMyCart(User user, UUID cartID) {
        var cart = this.orderRepository.getReferenceById(cartID);
        
        if (!cart.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Je kan de winkelmand van een andere gebruiker niet wijzigen!");
        }
        if (!cart.getStatus().equals(OrderStatus.CART)) {
            throw new IllegalArgumentException("Je kan deze winkelmand niet meer wijzigen!");
        }
        
        var currentDetails = cart.getOrderDetails();
        var currentDetailIds = currentDetails.stream().map(cd -> cd.getId()).toList();
        cart.getOrderDetails().removeAll(currentDetails);
        cart = orderRepository.save(cart);

        orderDetailRepository.deleteAllById(currentDetailIds);

        return cart;
    }

    public void makeOrderFromMyCart(User user, UUID cartID, String description) {
        var cart = this.orderRepository.getReferenceById(cartID);

        if (!cart.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("Kan kan de winkelmand van een andere gebruiker niet wijzigen!");
        }
        if (!cart.getStatus().equals(OrderStatus.CART)) {
            throw new IllegalArgumentException("Je kan deze winkelmand niet meer wijzigen!");
        }

        cart.setSentDate(new Date());
        cart.setStatus(OrderStatus.SENT);
        cart.setDescription(description);
        cart = orderRepository.save(cart);
        cart.getOrderDetails().stream().forEach(od -> od.setArticlePriceAfterOrdering(od.getArticle().getPriceInEUR()));
        orderDetailRepository.saveAll(cart.getOrderDetails());
    }

    public void updateOrderStatus(UUID orderId, OrderStatus orderStatus) {
        var order = this.orderRepository.getReferenceById(orderId);

        switch (orderStatus) {
            case OrderStatus.PAID:
                order.setPaidDate(new Date());
                break;
            case OrderStatus.RECEIVED:
                order.setReceivedDate(new Date());
                break;
            case OrderStatus.PAID_AND_RECEIVED:
                if(order.getPaidDate() == null){
                    order.setPaidDate(new Date());
                }
                if(order.getReceivedDate() == null){
                    order.setReceivedDate(new Date());
                }
                break;
            default:
                break;
        }

        order.setStatus(orderStatus);
        this.orderRepository.save(order);

    }

    private Double getAvailable(Article article) {
        var statusses = Arrays.asList(new OrderStatus[] {OrderStatus.SENT, OrderStatus.PAID});
        var totalOrderedQuantity = new ArrayList<>(article.getOrderDetail()).stream().filter(od -> statusses.contains(od.getOrder().getStatus())).map(od -> od.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
        var allStock = article.getStock().stream().map(stockItem -> stockItem.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
        return allStock - totalOrderedQuantity;
    }
}
