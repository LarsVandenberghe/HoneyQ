package be.honeyq.HoneyQBE.model;

import jakarta.persistence.CascadeType;
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
    Long id;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="article_id", nullable=false, referencedColumnName = "id")
    private Article article;

    Stock(){}

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
}
