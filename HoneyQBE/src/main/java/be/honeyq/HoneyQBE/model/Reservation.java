package be.honeyq.HoneyQBE.model;

import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reservation")
public class Reservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="article_id", nullable=false, referencedColumnName = "id")
    private Article article;

    Reservation(){}

    public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
}
