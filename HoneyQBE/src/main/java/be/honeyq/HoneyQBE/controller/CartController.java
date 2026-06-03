package be.honeyq.HoneyQBE.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import be.honeyq.HoneyQBE.dto.SimpleOrderDto;
import be.honeyq.HoneyQBE.helpers.UserContextHelper;
import be.honeyq.HoneyQBE.repository.UserRepository;
import be.honeyq.HoneyQBE.services.OrderService;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("cart")
@CrossOrigin
public class CartController {
    
    @Autowired
    private UserRepository userRepository;

	@Autowired
    private OrderService orderService;

    @GetMapping("")
	public List<SimpleOrderDto> findByUser() {
        var userId = UserContextHelper.getUserUUID();

		return userRepository
				.findById(userId).map(user -> user.getCart())
				.map(orders -> orders.stream().map(order -> SimpleOrderDto.fromDomain(order)).toList())
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						"Content not found!"
						));
	}

	@PostMapping("add-or-update-item/{id}/{amount}")
	public SimpleOrderDto addOrUpdateItemToMyCart(@PathVariable Long id, @PathVariable Double amount) {
        var userId = UserContextHelper.getUserUUID();
		var user = userRepository.findById(userId).get();

		try {
			var order = orderService.addItemToCart(user, id, amount);
			return SimpleOrderDto.fromDomain(order);
		} catch (IllegalArgumentException e) {
			var reason = e.getMessage();
			throw new ResponseStatusException(
				HttpStatus.BAD_REQUEST,
				reason
			);
		}
	}
}
