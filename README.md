# ⌛ Project-Hourglass ⌛

The project will center on the clock synchronization of multiple servers on a cluster of servers, using the [Berkeley algoritm](https://en.wikipedia.org/wiki/Berkeley_algorithm).

## [Client 🧔🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/clockServer/client)

Each client will show the clock in a format `hh:mm:ss`, and each client (tied to a server) will have its own hour.

### Basic functionality
* [x] Show a *cute* clock that is tied to the hour of the server.
* [x] Set a button or input for the client to change the hour of the server.
* [x] Tie the client with the server.
  * [x] Connect client to server using Websockets.
  * [x] Read information from the server: `Date`.
  * [x] Store the information read from the server in a table.
  * [x] Store the information when the client changes the hour.
* [x] Generate Dockerfile *and maybe docker-compose* files.

### Polish ✨
* [ ] Show an error or success message when something has changed from the server to the client.

## [Server 🤖🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/clockServer/server)

Each server will be launched as a Docker container, and each server will have its own hour, generated at random from the hour of launch. As it can be seen, the server and the
client will be tied to the same container.

### Basic functionality
* [x] Start a web socket server and send the information to the client.
* [x] Send every minute the status of the hour of the server to the client.
* [x] There will be at least three running instances, in different containers.

## [Coordinator 👩‍🍳🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/coordinator)

The coordinator will handle the information of the status of the servers. The coordinator will be the one making the synchronization.

### Basic functionality
* [x] Show the amount of live and connected servers.
* [ ] Get the current time from some API, maybe [this one 🔗.](http://worldtimeapi.org/)
* [x] Make the coordinator able to launch new containers.
* [ ] Get the current hour of all of the connected servers.
* [ ] Use the [Berkeley algoritm](https://en.wikipedia.org/wiki/Berkeley_algorithm) every 2 minutes or so.
* [ ] Send the new hour to all of the connected servers.

## Diagrams
### Main diagram
![mainDiagram](https://github.com/HeizRaum/Project-Hourglass/blob/master/diagrams/diagram.svg)
