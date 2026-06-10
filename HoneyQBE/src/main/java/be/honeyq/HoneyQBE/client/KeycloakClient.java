package be.honeyq.HoneyQBE.client;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.ObjectMapper;

@Service
public class KeycloakClient {
    private RestClient restClient;

    @Value("${honeyq.keycloak-base-url}")
    String keycloakUri;

    ObjectMapper objectMapper = new ObjectMapper();

	public KeycloakClient(RestClient.Builder restClientBuilder) {
		this.restClient = restClientBuilder.baseUrl(this.keycloakUri).build();
	}

	public ResponseEntity<Void> setUserValidated(UUID userId) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
		JwtAuthenticationToken oauthToken = (JwtAuthenticationToken) authentication;
		return this.restClient.post().uri(this.keycloakUri + "/admin/realms/honeyq/users/{userId}/role-mappings/realm", userId)
        .headers((headers) -> {
            headers.set("Content-Type", "application/json");
            headers.setBearerAuth(oauthToken.getToken().getTokenValue());
        } )
        .body("{ \"name\": \"validated_user\"}").retrieve().toBodilessEntity();
	}

    public List<KeycloakUser> getUsersByValidateRole() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
		JwtAuthenticationToken oauthToken = (JwtAuthenticationToken) authentication;
        var token = oauthToken.getToken().getTokenValue();
		var data = this.restClient.get().uri(this.keycloakUri + "/admin/realms/honeyq/roles/validated_user/users")
        .headers((headers) -> headers.setBearerAuth(token)).retrieve().body(KeycloakUser[].class);

        return Arrays.asList(data);
    }
}


