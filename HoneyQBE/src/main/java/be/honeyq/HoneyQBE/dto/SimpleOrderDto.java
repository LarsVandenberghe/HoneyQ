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
    private String description;
    private Date sentDate;
    private Date paidDate;
    private Date receivedDate;


    public static SimpleOrderDto fromDomain(Order order) {
		var simpleOrder = new SimpleOrderDto();
		simpleOrder.id = order.getId();
		simpleOrder.orderDetails = order.getOrderDetails().stream().map(orderDetail -> SimpleOrderDetailDto.fromDomain(orderDetail)).toList();
		simpleOrder.status = order.getStatus();
        simpleOrder.description = order.getDescription();
        simpleOrder.sentDate = order.getSentDate();
        simpleOrder.paidDate = order.getPaidDate();
        simpleOrder.receivedDate = order.getReceivedDate();
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

    public String getDescription() {
        return description;
    }

    public Date getSentDate() {
    return sentDate;
  }

    public Date getPaidDate() {
    return paidDate;
  }

  public Date getReceivedDate() {
    return receivedDate;
  }

}
