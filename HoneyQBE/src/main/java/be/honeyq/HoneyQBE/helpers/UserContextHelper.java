package be.honeyq.HoneyQBE.helpers;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class UserContextHelper {
    public static UUID getUserUUID() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
		JwtAuthenticationToken oauthToken = (JwtAuthenticationToken) authentication;
		var userId = oauthToken.getToken().getClaimAsString("sub");
        return UUID.fromString(userId);
    }
}
