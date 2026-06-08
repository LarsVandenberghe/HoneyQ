package be.honeyq.HoneyQBE.dto;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import be.honeyq.HoneyQBE.model.Order;
import be.honeyq.HoneyQBE.model.OrderStatus;

public class SimpleOrderDto {
    private UUID id;
    private List<SimpleOrderDetailDto> orderDetails;
    private OrderStatus status;
    private Date sentDate;
    private String description;

    public static SimpleOrderDto fromDomain(Order order) {
		var simpleOrder = new SimpleOrderDto();
		simpleOrder.id = order.getId();
		simpleOrder.orderDetails = order.getOrderDetails().stream().map(orderDetail -> SimpleOrderDetailDto.fromDomain(orderDetail)).toList();
		simpleOrder.status = order.getStatus();
        simpleOrder.sentDate = order.getSentDate();
        simpleOrder.description = order.getDescription();
        return simpleOrder;
	}
    
    public UUID getId() {
        return id;
    }

    public List<SimpleOrderDetailDto> getOrderDetails() {
        return orderDetails;
    }

    public OrderStatus getStatus() {
        return status;
    }
    
    public Date getSentDate() {
        return sentDate;
    }

    public String getDescription() {
        return description;
    }
}
