const express = require("express");
const router = express.Router();

//import actions db
const actionsDb = require("../data/helpers/actionModel.js");

//GET all actions
router.get("/", (req, res) => {
  const promise = actionsDb.get();
  promise
    .then(actions => {
      if (!actions) {
        res
          .status(500)
          .json({ error: "There was an error retrieving all the actions" });
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving all the actions" })
    );
});

//GET specific actions
router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error retrieving the action" });
  }
  const promise = actionsDb.get(id);
  promise
    .then(action => {
      if (!action) {
        res
          .status(500)
          .json({ error: "There was an error retrieving the action" });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "There was an error retrieving the action" })
    );
});

//Add a new actions
router.post("/", (req, res) => {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    res.status(500).json({ error: "Action must include a description" });
  }
  const newAction = {
    project_id,
    description,
    notes,
    completed
  };

  const promise = actionsDb.insert(newAction);
  promise
    .then(actionObj => {
      console.log("action was added to DB");
      res.status(200).json(actionObj);
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error adding the action" })
    );
});

//Update existing action
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    res.status(500).json({ error: "Action must include a description" });
  }
  const updatedAction = {
    project_id,
    description,
    notes,
    completed
  };
  const promise = actionsDb.update(id, updatedAction);
  promise
    .then(action => res.status(200).json(action))
    .catch(err =>
      res.status(500).json({ error: "There was an error updating the action" })
    );
});

//Delete existing action
router.delete(":/id", (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(500).json({ error: "There was an error with the request" });
  }

  const promise = actionsDb.remove(id);
  promise
    .then(numOfRecords => {
      if (numOfRecords === 0) {
        res
          .status(500)
          .json({ error: "There was an error removing the action" });
      }
      res.status(200).json({ message: "action was removed" });
    })
    .catch(err =>
      res.status(500).json({ error: "There was an error removing the action" })
    );
});

module.exports = router;
