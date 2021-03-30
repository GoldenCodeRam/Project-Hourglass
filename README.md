# ⌛ Project-Hourglass ⌛

The project will center on the clock synchronization of multiple servers on a cluster of servers, using the [Berkeley algoritm](https://en.wikipedia.org/wiki/Berkeley_algorithm).

## [Client 🧔🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/client)

Each client will show the clock in a format `hh:mm:ss`, and each client (tied to a server) will have its own hour.

### Basic functionality
* [ ] Show a *cute* clock that is tied to the hour of the server.
* [ ] Set a button or input for the client to change the hour of the server.
* [ ] Tie the client with the server
  * [ ] Connect client to server using Websockets.
  * [ ] Read information from the server: `hour`
  * [ ] Store the information read from the server in a table.
  * [ ] Store the information when the client changes the hour.

### Polish ✨
* [ ] Show an error or success message when something has changed from the server to the client.

## [Server 🤖🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/server)

Each server will be launched as a Docker container, and each server will have its own hour, generated at random from the hour of launch. As it can be seen, the server and the
client will be tied to the same container.

### Basic functionality
* [ ] Start a web socket server and send the information to the client.
* [ ] Send every minute the status of the hour of the server to the client.
* [ ] There will be at least three running instances, in different containers.

## [Coordinator 👩‍🍳🔗](https://github.com/HeizRaum/Project-Hourglass/tree/master/coordinator)

The coordinator will handle the information of the status of the servers. The coordinator will be the one making the synchronization.

### Basic functionality
* [ ] Show the amount of live and connected servers.
* [ ] Get the current time from some API, maybe [this one 🔗.](http://worldtimeapi.org/)
* [ ] Make the coordinator able to launch new containers.
* [ ] Get the current hour of all of the connected servers.
* [ ] Use the [Berkeley algoritm](https://en.wikipedia.org/wiki/Berkeley_algorithm) every 2 minutes or so.
* [ ] Send the new hour to all of the connected servers.
