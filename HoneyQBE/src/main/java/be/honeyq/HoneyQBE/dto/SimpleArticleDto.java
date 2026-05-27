package be.honeyq.HoneyQBE.dto;

import be.honeyq.HoneyQBE.model.Article;

public class SimpleArticleDto {
	private Long id;
    private String name;
    private String description;
    private Double weightKg;
    private Boolean isBulk;
    private String imageUrl;
	private Double amountOfStock;
	private Double reservedStock;

    public static SimpleArticleDto fromDomain(Article article) {
		var simpleArticle = new SimpleArticleDto();
		simpleArticle.id = article.getId();
		simpleArticle.name = article.getName();
		simpleArticle.description = article.getDescription();
        simpleArticle.imageUrl = article.getImageUrl();
		simpleArticle.weightKg = article.getWeightKg();
		simpleArticle.isBulk = article.getIsBulk();
		simpleArticle.amountOfStock = article.getStock().stream().map(stockItem -> stockItem.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
		simpleArticle.reservedStock = article.getOrderDetail().stream().map(orderDetail -> orderDetail.getQuantity()).reduce(0.0, (subtotal, element) -> subtotal + element);
        return simpleArticle;
	}

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getWeightKg() {
        return weightKg;
    }

    public Boolean getIsBulk() {
        return isBulk;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public Double getAmountOfStock() {
        return amountOfStock;
    }

    public Double getReservedStock() {
        return reservedStock;
    }
}