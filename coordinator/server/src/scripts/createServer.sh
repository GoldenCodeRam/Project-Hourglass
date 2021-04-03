# $1: Name for the Docker container
# $2: Port from which the Docker container will obtain the server port and client port

SERVER_PORT=$2
CLIENT_PORT=$(($SERVER_PORT + 1))

docker run -dit -p $SERVER_PORT:8080 -p $CLIENT_PORT:8081 --name $1 alpine &>/dev/null

echo "200"