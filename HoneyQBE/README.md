## Making a docker container
1) ./mvnw package "-Dmaven.test.skip"
2) docker build -t honeyqbe .
3) docker save -o honeyqbe.tar.gz honeyqbe
4) copy to the host machine
5) load the image with: sudo docker load -i <myimage.tar.gz>
6) edit the docker settings file for honeyqfe
7) sudo docker compose up -d

## Database
You have to manually add the database to the postgres server

## OAuth2 Providers
### Google
https://console.cloud.google.com/welcome?project=honeyq

### Facebook
https://developers.facebook.com/apps/1720390452454311/go_live/

### OAuth2 documentation
https://docs.spring.io/spring-security/reference/reactive/oauth2/resource-server/jwt.html
https://dev.to/devaaai/spring-boot-security-tokens-validation-locally-using-keycloaks-public-keys-jwks-34o5#:~:text=Spring%20Boot%20Security%20tokens%20Validation%20locally%20using%20Keycloak's%20public%20keys%20(JWKS),-%23security%20%23java%20%23&text=In%20a%20Spring%20Security%20%2B%20Keycloak,calling%20Keycloak%20for%20each%20request.


authgear vs keycloak

docker run --name keycloak -p 8081:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin -e KC_DB=postgres -e KC_DB_URL=jdbc:postgresql://host.docker.internal:5432/keycloak?sslmode=disable -e KC_DB_USERNAME=<postgres> -e KC_DB_PASSWORD=<password> keycloak/keycloak:latest start-dev


### Keycloak
realm theme command update:
sudo docker cp /home/lars/keycloak-theme-for-kc-all-other-versions.jar keycloak:/opt/keycloak/providers/keycloak-theme-for-kc-all-other-versions.jar

Add a realm, new client with guid client ID

realm settings => User registration, remember me, Email as username, etc

set as valid redirect uris both the root FE (this is for returning after logout) as the auth-redirect uri

display html: <span style="color: wheat; font-size: 4rem; font-family: system-ui, -apple-sy; text-transform: none; font-weight: bolder; background: -webkit-linear-gradient(315deg, #e06c00 0%, #ffee00 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">HoneyQ</span>

ReCaptcha -> 
Authentication -> registration -> enable reCAPTCHA -> and add keys from secrets