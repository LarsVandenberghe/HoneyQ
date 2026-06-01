package be.honeyq.HoneyQBE.helpers;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

public class UserContextHelper {
    public static UUID getUserUUID() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
		JwtAuthenticationToken oauthToken = (JwtAuthenticationToken) authentication;
		var userId = oauthToken.getToken().getClaimAsString("sub");
        return UUID.fromString(userId);
    }

    public static Boolean hasValidatedUserRole() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
		JwtAuthenticationToken oauthToken = (JwtAuthenticationToken) authentication;
        Collection<GrantedAuthority> authorities = oauthToken.getAuthorities();
        
        Optional<String> validatedUserRole = authorities.stream()
            .map(GrantedAuthority::getAuthority)
            .filter(role -> role.equals("ROLE_validated_user"))
            .findFirst();

        return validatedUserRole.isPresent();
    }
}
