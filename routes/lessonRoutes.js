const { Router } = require("express");
const lessonController = require("../controllers/lessonController.js");

const router = Router();

router.get("/lessons", lessonController.lesson_get);

module.exports = router;
