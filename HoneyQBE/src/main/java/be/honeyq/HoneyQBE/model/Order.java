package be.honeyq.HoneyQBE.model;

import java.util.Date;
import java.util.Set;
import java.util.UUID;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
        
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @OneToMany(
    mappedBy="order",
    cascade = CascadeType.REFRESH,
    fetch = FetchType.EAGER
  )
  private Set<OrderDetail> orderDetails;

  @ManyToOne()
  @JoinColumn(name="user_id", nullable=false, referencedColumnName = "id")
  private User user;

  @Enumerated(EnumType.STRING)
  private OrderStatus status = OrderStatus.CART;

  private String description;

  @Column(nullable = true)
  private Date sentDate;

  @Column(nullable = true)
  private Date paidDate;

  @Column(nullable = true)
  private Date receivedDate;

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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Date getSentDate() {
    return sentDate;
  }

  public void setSentDate(Date sentDate) {
    this.sentDate = sentDate;
  }

    public Date getPaidDate() {
    return paidDate;
  }

  public void setPaidDate(Date paidDate) {
    this.paidDate = paidDate;
  }

  public Date getReceivedDate() {
    return receivedDate;
  }

  public void setReceivedDate(Date receivedDate) {
    this.receivedDate = receivedDate;
  }
}
