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

//import db
const projectsDb = require("./data/helpers/projectModel");
const actionsDb = require("./data/helpers/actionModel");

//route handlers
server.get("/", (req, res) => {
  res.status(200).send("<h1>Projects app</h1>");
});

//Get all actions for project
server.get("/projects/:id/actions", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error with the request" });
  }
  const promise = projectsDb.getProjectActions(id);
  promise
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving the actions" })
    );
});

//Delete action
server.delete("/actions/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error with your request" });
  }
  const promise = actionsDb.remove(id);
  promise
    .then(numOfRecords =>
      res.status(200).json({ message: "Actions was removed succesfully" })
    )
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the action" })
    );
});

//Delete project
server.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error with your request" });
  }
  const promise = projectsDb.remove(id);
  promise
    .then(numOfRecords =>
      res.status(200).json({ message: "Project was removed succesfully" })
    )
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the Project" })
    );
});

//listen
const port = 9000;
server.listen(port, () => console.log("Server is running"));

//Delete route - > is not working inside projectRouters
