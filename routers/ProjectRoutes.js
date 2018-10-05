const express = require("express");
const router = express.Router();

//import projects db
const projectsDb = require("../data/helpers/projectModel");

//declare routes

//GET all project
router.get("/", (req, res) => {
  const promise = projectsDb.get();
  promise
    .then(projects => {
      if (!projects) {
        res
          .status(500)
          .json({ error: "There was an error retrieving all the projects" });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving all the projects" })
    );
});

//GET specific project
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res
      .status(500)
      .json({ error: "There was an error retrieving the project" });
  }
  const promise = projectsDb.get(id);
  promise
    .then(project => {
      if (!project) {
        res
          .status(500)
          .json({ error: "There was an error retrieving the project" });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving the project" })
    );
});

//Add a new project
router.post("/", (req, res) => {
  const { name, description, completed } = req.body;

  if (!name || !description) {
    res
      .status(500)
      .json({ error: "Project must include a title and a description" });
  }
  const newProject = {
    name: name,
    description: description,
    completed: completed
  };

  const promise = projectsDb.insert(newProject);
  promise
    .then(projectObj => {
      console.log("project was added to DB");
      res.status(200).json(projectObj);
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error adding the project" })
    );
});

//Update existing post
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, description, completed } = req.body;

  if (!name || !description || !id) {
    res
      .status(500)
      .json({ error: "Project must include a title and a description" });
  }
  const updatedProject = {
    name: name,
    description: description,
    completed: completed
  };
  const promise = projectsDb.update(id, updatedProject);
  promise
    .then(project => res.status(200).json(project))
    .catch(err =>
      res.status(500).json({ error: "There was an error updating the project" })
    );
});

//Delete existing post
router.delete(":/id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error with the request" });
  }

  const promise = projectsDb.remove(id);
  promise
    .then(numOfRecords => {
      if (numOfRecords === 0) {
        res
          .status(500)
          .json({ error: "There was an error removing the project" });
      }
      res.status(200).json({ message: "Project was removed" });
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the project" })
    );
});

module.exports = router;
