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
import be.honeyq.HoneyQBE.client.KeycloakClient;
import be.honeyq.HoneyQBE.dto.SimpleAdminOrderDto;
import be.honeyq.HoneyQBE.dto.SimpleUserWithRoleCheckDto;
import be.honeyq.HoneyQBE.model.OrderStatus;
import be.honeyq.HoneyQBE.repository.OrderRepository;
import be.honeyq.HoneyQBE.repository.UserRepository;
import be.honeyq.HoneyQBE.services.OrderService;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("admin")
public class AdminController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KeycloakClient keycloakClient;

    @GetMapping("pending-orders")
	public List<SimpleAdminOrderDto> findByUser() {
		return orderRepository.pendingOrders().stream()
				.map(order -> SimpleAdminOrderDto.fromDomain(order))
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

    @GetMapping("all-users-with-role-check")
	public List<SimpleUserWithRoleCheckDto> getAllUsersWithRoleCheck() {
        var allUsersWithRole = this.keycloakClient.getUsersByValidateRole();
		return userRepository.findAll().stream()
            .map(user -> {
                var userData = SimpleUserWithRoleCheckDto.fromDomain(user);
                var userInValidatedRole = allUsersWithRole.stream()
                    .filter(u -> u.getId().equals(user.getId().toString()))
                    .findAny();
                userData.setValidUser(userInValidatedRole.isPresent());
                return userData;
            }).toList();
	}
    
    @PostMapping("validate-user/{userId}")
    public void postMethodName(@PathVariable UUID userId) {
        this.keycloakClient.setUserValidated(userId);
        // TODO SEND MAIL?
    }
}
