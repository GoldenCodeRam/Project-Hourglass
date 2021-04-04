# $1: Name for the Docker container
# $2: Port from which the Docker container will obtain the server port and client port

DOCKER_IMAGE_NAME="heizraum/clock-server-hourglass"

SERVER_PORT=$2
CLIENT_PORT=$(($SERVER_PORT + 1))

docker run -dit -p $SERVER_PORT:8080 -p $CLIENT_PORT:8081 -e "VUE_APP_SERVER_PORT=$SERVER_PORT" --name $1 $DOCKER_IMAGE_NAME

sleep 10

echo "200"