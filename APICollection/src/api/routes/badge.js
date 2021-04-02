const express = require('express');
const router = express.Router();
const badge = require("../controllers/badge");

router.post("/", badge.create);
router.get("/", badge.findAll);

module.exports = router;
