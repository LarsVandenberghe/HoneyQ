package be.honeyq.HoneyQBE.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// This is the current state of cart for a user one to one relation with user
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @ManyToOne
  @JoinColumn(name="article_id", nullable=false, referencedColumnName = "id")
  private Article article;

  @ManyToOne
  @JoinColumn(name="order_id", nullable=false, referencedColumnName = "id")
  private Order order;
 
  private Double quantity;
  
  @Column(nullable = true)
  private Double articlePriceAfterOrdering;

  public OrderDetail(Article article, Order order, Double quantity) {
    this.article = article;
    this.order = order;
    this.quantity = quantity;
  }

  OrderDetail(){}

  public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}

  public Article getArticle() {
    return article;
  }

  public void setArticle(Article article) {
    this.article = article;
  }

  public Order getOrder() {
    return order;
  }

  public void setOrder(Order order) {
    this.order = order;
  }

  public Double getQuantity() {
    return quantity;
  }

  public void setQuantity(Double quantity) {
    this.quantity = quantity;
  }

  public Double getArticlePriceAfterOrdering() {
    return articlePriceAfterOrdering;
  }

  public void setArticlePriceAfterOrdering(Double articlePriceAfterOrdering) {
    this.articlePriceAfterOrdering = articlePriceAfterOrdering;
  }
}
