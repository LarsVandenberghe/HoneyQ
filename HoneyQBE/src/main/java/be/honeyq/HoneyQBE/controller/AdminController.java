package be.honeyq.HoneyQBE.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import be.honeyq.HoneyQBE.dto.SimpleOrderDto;
import be.honeyq.HoneyQBE.model.OrderStatus;
import be.honeyq.HoneyQBE.repository.OrderRepository;
import be.honeyq.HoneyQBE.services.OrderService;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @GetMapping("pending-orders")
	public List<SimpleOrderDto> findByUser() {
		return orderRepository.pendingOrders().stream()
				.map(order -> SimpleOrderDto.fromDomain(order))
                .toList();
	}

    @PostMapping("update-order-status/{id}/status/{status}")
    public void postMethodName(@PathVariable UUID id, @PathVariable OrderStatus status) {
        try {
            this.orderService.updateOrderStatus(id, status);
		} catch (IllegalArgumentException e) {
			var reason = e.getMessage();
			throw new ResponseStatusException(
				HttpStatus.BAD_REQUEST,
				reason
			);
		}
    }
    
    @PostMapping("validate-user/{userId}")
    public void postMethodName(@PathVariable UUID userId) {
        // TODO SEND MAIL?
    }
}
