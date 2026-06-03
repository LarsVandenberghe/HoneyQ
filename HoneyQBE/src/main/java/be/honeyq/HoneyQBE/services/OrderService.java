package be.honeyq.HoneyQBE.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
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

    public Order addItemToCart(User user, Long itemNr, Double amount) {
        var orders = this.orderRepository.findByUser(user);
        var currentCart = orders.stream().filter(o -> o.getStatus() == OrderStatus.CART).findFirst();

        var article = articleRepository.getReferenceById(itemNr);
        var available = getAvailable(article);

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
        var articleAlreadyInDetail = curentDetails.stream().filter(cd -> cd.getArticle().getId() == itemNr).findFirst();

        OrderDetail orderDetail = null;
        if (articleAlreadyInDetail.isPresent() && amount > 0) {
            orderDetail = articleAlreadyInDetail.get();
            orderDetail.setQuantity(amount);
            orderDetailRepository.save(orderDetail);
            return orderRepository.getReferenceById(cart.getId());

        } else if (articleAlreadyInDetail.isPresent() && amount <= 0) {
            cart.getOrderDetails().remove(articleAlreadyInDetail.get());
            cart = orderRepository.save(cart);
            orderDetailRepository.delete(articleAlreadyInDetail.get());
            // TODO LVA look into cascading types => for some reason when the orderDetail is being removed the  Order itself is also gone!
            return cart;
        } else if (amount > 0) {
            orderDetail = new OrderDetail(article, cart, amount);
            orderDetail = orderDetailRepository.save(orderDetail);
            cart.getOrderDetails().add(orderDetail);
            return orderRepository.save(cart);
        }
        return orderRepository.getReferenceById(cart.getId());
    }

    private Double getAvailable(Article article) {
        var statusses = Arrays.asList(new OrderStatus[] {OrderStatus.SENT, OrderStatus.PAID});
        var totalOrderedQuantity = new ArrayList<>(article.getOrderDetail()).stream().filter(od -> statusses.contains(od.getOrder().getStatus())).map(od -> od.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
        var allStock = article.getStock().stream().map(stockItem -> stockItem.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
        return allStock - totalOrderedQuantity;
    }
}
