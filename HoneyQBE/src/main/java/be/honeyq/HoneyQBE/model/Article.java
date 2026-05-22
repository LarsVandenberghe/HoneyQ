package be.honeyq.HoneyQBE.model;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "article")
public class Article {
    
	@Id
	@GeneratedValue
	private Long id;
    private String name;
    private String description;

    @Column(
		nullable = true
	)
    private String imageUrl;

    @OneToMany(mappedBy="article")
    private Set<Stock> stock;

    @OneToMany(mappedBy="article")
    private Set<Reservation> reservation;

    Article(){}

    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
