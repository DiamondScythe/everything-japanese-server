const Flashcard = require("../mondels/Flashcard.js");

//controller actions

//get all flashcards asscoiated with a user id
module.exports.flashcard_get = async (req, res) => {
  const flashcards = await Flashcard.getAllFlashcards(req.user.id);
  res.json({
    flashcards: flashcards,
  });
};
