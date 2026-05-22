package be.honeyq.HoneyQBE.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {
        
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    Cart(){}

    public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}
}
