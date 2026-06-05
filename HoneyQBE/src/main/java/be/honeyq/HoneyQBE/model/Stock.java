package be.honeyq.HoneyQBE.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "stock")
public class Stock {

  @Id
  @GeneratedValue
  private Long id;
  
  @ManyToOne()
  @JoinColumn(name="article_id", nullable=false, referencedColumnName = "id")
  private Article article;

  private Double quantity;

  Stock(){}

  public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

  public Article getArticle() {
    return article;
  }

  public void setArticle(Article article) {
    this.article = article;
  }

  public Double getQuantity() {
    return quantity;
  }

  public void setQuantity(Double quantity) {
    this.quantity = quantity;
  }

}
