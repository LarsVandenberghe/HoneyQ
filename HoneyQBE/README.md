## Making a docker container
1) docker build -t honeyqbe .
2) docker save -o honeyqbe.tar.gz honeyqbe
3) copy to the host machine
4) load the image with: sudo docker load -i <myimage.tar.gz>
5) edit the docker settings file for honeyqfe
6) sudo docker compose up -d

## Database
You have to manually add the database to the postgres server

## OAuth2 Providers
### Google
https://console.cloud.google.com/welcome?project=honeyq

### Facebook
https://developers.facebook.com/apps/1720390452454311/go_live/