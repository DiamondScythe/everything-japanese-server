const { Router } = require("express");
const flashcardController = require("../controllers/flashcardController.js");

const router = Router();

router.get("/api/allFlashcards", flashcardController.flashcards_get);
router.post("/api/addFlashcards", flashcardController.flashcards_post);
router.get(
  "/api/dueFlashcards/:userId",
  flashcardController.flashcards_due_get
);

module.exports = router;
