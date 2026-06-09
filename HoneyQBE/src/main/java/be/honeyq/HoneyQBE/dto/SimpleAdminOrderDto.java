package be.honeyq.HoneyQBE.dto;

import be.honeyq.HoneyQBE.model.Order;

public class SimpleAdminOrderDto extends SimpleOrderDto {
    private SimpleUserDto user;

    public static SimpleAdminOrderDto fromDomain(Order order) {
        var simpleOrder = new SimpleAdminOrderDto();
		simpleOrder.id = order.getId();
		simpleOrder.orderDetails = order.getOrderDetails().stream().map(orderDetail -> SimpleOrderDetailDto.fromDomain(orderDetail)).toList();
		simpleOrder.status = order.getStatus();
        simpleOrder.description = order.getDescription();
        simpleOrder.sentDate = order.getSentDate();
        simpleOrder.paidDate = order.getPaidDate();
        simpleOrder.receivedDate = order.getReceivedDate();
        simpleOrder.user = SimpleUserDto.fromDomain(order.getUser());
        return simpleOrder;
	}

    public SimpleUserDto getUser() {
        return user;
    }
}
