package be.honeyq.HoneyQBE.model;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_details")
public class User {
    @Id
    private UUID id;

    private String emailAddress;

    @Column(nullable = true)
    private String firstName;

    @Column(nullable = true)
    private String lastName;

    @OneToMany(
        mappedBy="user",
        cascade = CascadeType.REFRESH,
        fetch = FetchType.EAGER
    )
    private Set<Order> orders;

    public User(String emailAddress, String firstName, String lastName) {
        this.emailAddress = emailAddress;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public User(UUID id, String emailAddress, String firstName, String lastName) {
        this(emailAddress, firstName, lastName);
        this.id = id;
    }

    User(){}

    public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public List<Order> getCart() {
        var statusses = Arrays.asList(new OrderStatus[] {OrderStatus.CART, OrderStatus.SENT});
        return orders.stream().filter(o -> statusses.contains(o.getStatus())).toList();
    }

    public void setOrders(Set<Order> order) {
        this.orders = order;
    }
}
