const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>
  res.status(200).json({ projects: "here are the projects" })
);

module.exports = router;
