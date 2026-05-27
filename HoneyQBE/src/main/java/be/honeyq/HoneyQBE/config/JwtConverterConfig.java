package be.honeyq.HoneyQBE.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;

import be.honeyq.HoneyQBE.model.User;
import be.honeyq.HoneyQBE.repository.UserRepository;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Configuration
public class JwtConverterConfig {

    @Autowired 
    private UserRepository userRepository;

    @Bean
    public JwtAuthenticationConverter customJwtAuthenticationConverter() {

        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            this.storeUserDetails(jwt);

            // Example: map Keycloak realm roles
            var realmAccess = (Map<String, List<String>>) jwt.getClaim("realm_access");

            Collection<GrantedAuthority> realmRoles = realmAccess != null
                    ? ((Collection<String>) (realmAccess)
                        .getOrDefault("roles", List.of()))
                        .stream()
                        .map(role -> (GrantedAuthority) new SimpleGrantedAuthority("ROLE_" + role))
                        .toList()
                    : List.of();
            var roles = realmRoles.stream().toList();

            return roles;
        });

        return converter;
    }


    private void storeUserDetails(Jwt jwt) {
        var email = jwt.getClaimAsString("email");
        var firstName = jwt.getClaimAsString("given_name");
        var lastName = jwt.getClaimAsString("family_name");
        var id = UUID.fromString(jwt.getClaimAsString("sub"));

        var userEntity = userRepository.findById(id).orElse(null);
        if (userEntity == null) {
            var user = new User(id, email, firstName, lastName);
            userRepository.save(user);
        }
    }

}
