package be.honeyq.HoneyQBE.dto;

import be.honeyq.HoneyQBE.model.User;

public class SimpleUserWithRoleCheckDto extends SimpleUserDto {
    private boolean isValidUser; 

    public boolean isValidUser() {
        return isValidUser;
    }

    public void setValidUser(boolean isValidUser) {
        this.isValidUser = isValidUser;
    }

    public static SimpleUserWithRoleCheckDto fromDomain(User user) {
		var simpleUser = new SimpleUserWithRoleCheckDto();

        simpleUser.id = user.getId();
        simpleUser.emailAddress = user.getEmailAddress();
        simpleUser.firstName = user.getFirstName();
        simpleUser.lastName = user.getLastName();
        return simpleUser;
	}
}
