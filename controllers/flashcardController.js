const Flashcard = require("../models/Flashcard.js");
const sm2Algorithm = require("../helpers/sm2.js");
//sm2Algorithm(q, n, EF, I)

//controller actions

//get all flashcards asscoiated with a user id
module.exports.flashcards_get = async (req, res) => {
  try {
    const flashcards = await Flashcard.getAllFlashcards(req.body.id);
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

//get all flashcards of a user that are due for review
module.exports.flashcards_due_get = async (req, res) => {
  try {
    console.log(req.params.userId);
    const flashcards = await Flashcard.getDueFlashcards(req.params.userId);
    res.json({
      flashcards: flashcards,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

//grade a flashcard and update the database
module.exports.grade_card_post = async (req, res) => {
  try {
    const id = req.body.id;
    const oldCard = await Flashcard.getFlashcardById(id);
    const Q = req.body.score;
    const N = oldCard.stats.N;
    const EF = oldCard.stats.EF;
    const I = oldCard.stats.I;

    const newStats = sm2Algorithm(Q, N, EF, I);

    const newLastReviewed = new Date();
    const newNextReview = new Date();

    newNextReview.setDate(newLastReviewed.getDate() + newStats.I);

    const update = {
      $set: {
        stats: newStats,
        lastReviewed: newLastReviewed,
        nextReview: newNextReview,
      },
    };

    //update the flashcard with new information
    const updatedCard = await Flashcard.updateFlashcard(id, update);
    res.json(updatedCard);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
