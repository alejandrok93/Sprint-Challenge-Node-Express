const express = require("express");
const router = express.Router();

//import projects db

router.get("/", (req, res) =>
  res.status(200).json({ actions: "here are the actions" })
);

module.exports = router;
