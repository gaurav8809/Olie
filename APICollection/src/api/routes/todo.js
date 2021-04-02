const express = require('express');
const router = express.Router();
const todo = require("../controllers/todo");

router.post("/", todo.create);
router.get("/", todo.findAll);

module.exports = router;
