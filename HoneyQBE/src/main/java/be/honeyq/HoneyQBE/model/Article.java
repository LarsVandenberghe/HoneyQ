package be.honeyq.HoneyQBE.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "article")
public class Article {
    
	@Id
	@GeneratedValue
	private Integer id;
    private String name;
    private String translationKey;

    @Column(
		nullable = true
	)
    private String imageUrl;


    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getTranslationKey() {
        return translationKey;
    }
    public void setTranslationKey(String translationKey) {
        this.translationKey = translationKey;
    }

    Article(){}
}
