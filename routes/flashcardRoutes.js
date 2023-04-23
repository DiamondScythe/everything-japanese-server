const { Router } = require("express");
const flashcardController = require("../controllers/flashcardController.js");

const router = Router();

router.get("/api/allFlashcards/:userId", flashcardController.flashcards_get);
router.post("/api/addFlashcards", flashcardController.flashcards_post);

module.exports = router;
