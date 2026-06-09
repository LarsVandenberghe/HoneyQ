package be.honeyq.HoneyQBE.dto;

import java.util.UUID;
import be.honeyq.HoneyQBE.model.User;

public class SimpleUserDto {
    private String emailAddress;
    private UUID id;
    private String firstName;
    private String lastName;

    public static SimpleUserDto fromDomain(User user) {

		var simpleUser = new SimpleUserDto();

        simpleUser.id = user.getId();
        simpleUser.emailAddress = user.getEmailAddress();
        simpleUser.firstName = user.getFirstName();
        simpleUser.lastName = user.getLastName();
        return simpleUser;
	}

    public String getEmailAddress() {
        return emailAddress;
    }
    public UUID getId() {
        return id;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
}
