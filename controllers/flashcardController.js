const Flashcard = require("../models/Flashcard.js");

//controller actions

//router.get("/api/allFlashcards/:userId", flashcardController.flashcards_get);
//router.post("/api/addFlashcards", flashcardController.flashcards_post);

//get all flashcards asscoiated with a user id
module.exports.flashcards_get = async (req, res) => {
  try {
    const flashcards = await Flashcard.getAllFlashcards(req.user.id);
    res.json({
      flashcards: flashcards,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//add a set of flashcards to the base from an array sent in the body
module.exports.flashcards_post = async (req, res) => {
  const examples = req.body.examples;
  console.log(req.body);
  console.log(examples);

  //for each example, create a flashcard object and add it to the database
  const flashcards = [];
  examples.forEach((example) => {
    const flashcard = {
      userId: req.body.userId,
      card: example.example,
      lessonNumber: req.body.lessonNumber,
      translation: example.translation,
      stats: { N: 0, EF: 2.5, I: 0 },
      lastReviewed: new Date(),
      nextReview: new Date(),
    };
    flashcards.push(flashcard);
  });

  console.log(flashcards);

  try {
    const newFlashcards = await Flashcard.addFlashcards(flashcards);
    res.status(201).json({
      flashcards: newFlashcards,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
