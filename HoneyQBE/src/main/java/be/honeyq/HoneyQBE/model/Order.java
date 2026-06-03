package be.honeyq.HoneyQBE.model;

import java.util.Set;
import java.util.UUID;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

// This is both a cart (finalized = false) and an order
@Entity
@Table(name = "orders")
public class Order {
        
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @OneToMany(mappedBy="order")
  private Set<OrderDetail> orderDetails;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name="user_id", nullable=false, referencedColumnName = "id")
  private User user;

  private OrderStatus status = OrderStatus.CART;

  public Order(Set<OrderDetail> orderDetails, User user, OrderStatus status) {
    this.orderDetails = orderDetails;
    this.user = user;
    this.status = status;
  }

  Order(){}

  public UUID getId() {
		return id;
	}
	public void setId(UUID id) {
		this.id = id;
	}

  public Set<OrderDetail> getOrderDetails() {
    return orderDetails;
  }

  public void setOrderDetails(Set<OrderDetail> orderDetails) {
    this.orderDetails = orderDetails;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public OrderStatus getStatus() {
    return status;
  }

  public void setStatus(OrderStatus status) {
    this.status = status;
  }
}
