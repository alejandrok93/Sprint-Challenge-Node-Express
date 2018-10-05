# Review Questions

## What is Node.js?

Node is a runtime environment used to execute Javscript applications outside the browser.

## What is Express?

Express is an npm module that sits on top of the Node.js server that allows us to quickly build servers. It is pretty lightweight and unopinionated, which allows us to configure and extend by using middleware.

## Mention two parts of Express that you learned about this week.

This week I learned about route handlers that tell the server what to do when a specific endpoint is hit. I also learned that I can set up middleware to interact with a client's request before it goes to the route handlers.

## What is Middleware?

Middleware is a function that gets the request object and can interact to make any changes before it goes on to the next middleware.

## What is a Resource?

A resource is anything that can be requested by a client, whether it is a record in a database or a type of file. Following RESTful standards, all resources should be accessesible via a unique URI.

## What can the API return to help clients know if a request was successful?

API can return status codes to let the client know the status of a request whether it is successful or there was an error. The status code for a successful request is 200.

## How can we partition our application into sub-applications?

We can partition our API application using routers either by type of feature.

## What is express.json() and why do we need it?

Express.json is a built in middleware that allows us to parse incoming JSON requests that are stored in the body of a request.
