## Making a docker container
1) ./mvnw package
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

https://docs.spring.io/spring-security/reference/reactive/oauth2/resource-server/jwt.html
https://stackoverflow.com/questions/74538964/spring-oauth2-resource-server-with-google-authorization-server