package be.honeyq.HoneyQBE.dto;

import java.util.UUID;

import be.honeyq.HoneyQBE.model.OrderDetail;

public class SimpleOrderDetailDto {
    private UUID id;
    private SimpleArticleDto article;
    private Double quantity;

    public static SimpleOrderDetailDto fromDomain(OrderDetail orderDetail) {
		var simpleOrderDetail = new SimpleOrderDetailDto();
		simpleOrderDetail.id = orderDetail.getId();
		simpleOrderDetail.article = SimpleArticleDto.fromDomain(orderDetail.getArticle());
		simpleOrderDetail.quantity = orderDetail.getQuantity();
        return simpleOrderDetail;
	}

    public UUID getId() {
        return id;
    }

    public SimpleArticleDto getArticle() {
        return article;
    }

    public Double getQuantity() {
        return quantity;
    }

}
