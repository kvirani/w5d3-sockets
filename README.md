## W5D3 - KV

### Goal:

We want to be able to implement real-time communication between multiple clients and a server *in a browser*. Examples include collaborative documents like gDocs, or project boards like Trello, or chat servers like Slack.

### Problem:

Since we're in the browser, we have to use HTTP. There are two problems with using HTTP for this.

1. With HTTP requests, the server cannot initiate a request to the client (browser). ie HTTP requests are always initiated by the client (browser). This means we cannot push data to the client easily.
2. HTTP requests are not persistent in their nature. They are transactional (client opens -> request -> response -> client closes)

**Question:** Can we accomplish real time updates without a persistent conn? (ie without WebSockets?)<br>
**Answer**: Yes, with polling. We can use setInterval or setTimeout this.

### Hacky Solution 1: Simple Polling

Continuously send GET requests to "poll" (pull) for new changes from the server.

Options:
- setTimeout
- setInterval

```js
// Common mistake to try and do this
while(true) {
  setTimeout(function() {
    makeRequest();
  }, 1000);
  // ... ?
}
```

This works though:

```js
// Common mistake to try and do this
setInterval(function() {
  makeRequest(); // <= AJAX call in here
}, 1000);
// ... ?
```

It doesn't wait for the response and ALWAYS makes a request every second. What can go wrong with this approach?

Due to varying speeds and disruption, results can come back in the wrong order. If there is a failure (outage due to WIFI/Data being down) it still keeps trying and doesn't have good error handling.

Better solution, which waits for the response:

```js
function poll() {
  setTimeout(function() {
    makeRequest(poll);
  }, 1000);
  return;
}
poll();
```

Will it result in a stackoverflow since there is no base/terminating case here? KV doesn't think so. **HOMEWORK!**

Pros and cons of constant polling:

- Not really real time
- Can be messy because it's hacky.
- Scaling issues with many requests per second.

Pros:
- Biggest one: It works without WebSockets being avaialble to the browser.

### Hacky Solution 2: Long Polling (aka "Comet")


The client makes an HTTP request but doesn't hear back right away. The server chooses not to respond until it has another message/update for that client.

When the server has a new message for that client, it will send the new message and -- b/c it's just plain HTTP the connection -- it ends the connection. As soon as that happens, the client has to reinitiate another long poll.

Pros:
- Fewer requests b/c you're not polling every x seconds
- Way closer to "real time"
- Responses come back in order

### Others

There were other hacky solutions before WebSocket. Long Polling is one popular one and I believe another was to use Adobe Flash to establish persistent TCP connections.

### Modern Solution: Use WebSockets

Instead of `http://` a connection is maintained via `ws://`.

Like with any TCP connection, the underlying library (browser) has to support a bunch of events/triggers:

- open
- send
- receive
- close

You can find the code we wrote in the code directly in this repo. A reminder that this code is NOT practical for creating a collaborative document. It's quite simple and doesn't handle error situations or other edge cases.

### Link to Original Code (Credit to Fabio!)

_This demo and the code for it was taken from Fabio (Toronto instructor). You can see his lecture notes and code here: <https://github.com/fzero/lhl-lectures/tree/master/w6d3-websockets>. Thanks Fabio!_

