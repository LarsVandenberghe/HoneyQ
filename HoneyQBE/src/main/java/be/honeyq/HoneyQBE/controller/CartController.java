package be.honeyq.HoneyQBE.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import be.honeyq.HoneyQBE.dto.SimpleOrderDto;
import be.honeyq.HoneyQBE.helpers.UserContextHelper;
import be.honeyq.HoneyQBE.repository.UserRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("cart")
@CrossOrigin
public class CartController {
    
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
	public List<SimpleOrderDto> findById() {
        var userId = UserContextHelper.getUserUUID();

		return userRepository
				.findById(userId).map(user -> user.getOrders())
				.map(orders -> orders.stream().map(order -> SimpleOrderDto.fromDomain(order)).toList())
				.orElseThrow(() -> new ResponseStatusException(
						HttpStatus.NOT_FOUND,
						"Content not found!"
						));
	}
}
