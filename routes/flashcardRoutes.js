const { Router } = require("express");
const flashcardController = require("../controllers/flashcardController.js");

const router = Router();

router.get("/lessons", flashcardController.flashcard_get);

module.exports = router;
