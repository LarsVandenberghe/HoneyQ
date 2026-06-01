package be.honeyq.HoneyQBE.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import be.honeyq.HoneyQBE.helpers.UserContextHelper;

@RestController
@RequestMapping("user-privilege")
@CrossOrigin
public class UserPrivilegeController {
    
    @GetMapping("/has-validated_user-role")
	public Boolean hasValidatedUserRole() {
        return UserContextHelper.hasValidatedUserRole();
    }
}
