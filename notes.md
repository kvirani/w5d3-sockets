# W5D3 - KV

WEB SOCKETS!!!

Problem: HTTP requests are stateless, and the server cannot initiate a request to the client. ie HTTP requests are always initiated by the client (browser). Cannot push data to the client easily.

HTTP requests are not persistent. They are transactional.

Q: Can we accomplish real time updates without a persistent conn?
A: Polling. We can use setInterval or setTimeout for this.

Challenges:
 - Overhead:  A lot of HTTP requests (headers, body, cookies, etc)
 - Not truly real time: every 5s or 1s or wtv.
 - Complex error handling needed
 - When polling, can you do other stuff?
 - Request deltas

Q: Any other (better) solutions?
A: Long polling "Comet"

One connection (singleton) that stays hanging b/c the server doesn't respond until it has a new message (payload) for that client.

# WEBSOCKETS

Instead of http:// a connection is established via ws://

Like with any TCP connection, the underlying library (browser) has to support a bunch of events/triggers:

- open
- send
- receive
- close





