//import libraries
const express = require("express");

//set up middleware
const server = express();
server.use(express.json());

//set up routers
const projectRouters = require("./routers/ProjectRoutes.js");
const actionsRouters = require("./routers/ActionsRoutes.js");

server.use("/projects", projectRouters);
server.use("/actions", actionsRouters);

//route handlers
server.get("/", (req, res) => {
  res.status(200).send("<h1>Projects app</h1>");
});

//listen
const port = 9000;
server.listen(port, () => console.log("Server is running"));
