const mongoose = require("mongoose");
const { Schema } = mongoose;

const flashcardSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
  stats: {
    //The repetition number n, which is the number of times the card
    //has been successfully recalled (meaning it was given a grade ≥ 3)
    //in a row since the last time it was not.
    N: {
      type: Number,
      required: true,
    },
    //The easiness factor EF, which loosely indicates how "easy" the card is
    //(more precisely, it determines how quickly the inter-repetition interval grows)
    //The initial value of EF is 2.5.
    EF: {
      type: Number,
      required: true,
    },
    //The inter-repetition interval I, which is the length of time (in days)
    //the system will wait after the previous review before asking the user
    //to review the card again.
    I: {
      type: Number,
      required: true,
    },
  },
  lastReviewed: {
    type: Date,
    required: true,
  },
  nextReview: {
    type: Date,
    required: true,
  },
  audioFileName: {
    type: String,
    required: true,
    default: "N/A",
  },
});

//the below is a static method that will be used to get all the flashcards for a user
flashcardSchema.statics.getAllFlashcards = async function (userId) {
  const flashcards = await this.find({ userId: userId });
  if (flashcards) {
    return flashcards;
  } else {
    throw Error("No flashcards found");
  }
};

//the below is a static method that will be used to add a set of flashcards to the database
flashcardSchema.statics.addFlashcards = async function (flashcards) {
  const newFlashcards = await this.insertMany(flashcards);
  if (newFlashcards) {
    return newFlashcards;
  } else {
    throw Error("No flashcards added");
  }
};

//the below is a static method that will be used to add a single flashcard to the database
flashcardSchema.statics.addFlashcard = async function (userId, flashcard) {
  const newFlashcard = await this.create(flashcard);
  if (newFlashcard) {
    return newFlashcard;
  } else {
    throw Error("No flashcard added");
  }
};

//the below method will be used to update a flashcard in the database with new information
flashcardSchema.statics.updateFlashcard = async function (flashcardId, update) {
  const updatedFlashcard = await this.findByIdAndUpdate(flashcardId, update, {
    new: true,
  });
  if (updatedFlashcard) {
    return updatedFlashcard;
  } else {
    throw Error("No flashcard updated");
  }
};

//the below method gets all the flashcards from a certain user that are due for review
flashcardSchema.statics.getDueFlashcards = async function (userId) {
  const dueFlashcards = await this.find({
    userId: userId,
    nextReview: { $lte: new Date() },
  });
  if (dueFlashcards) {
    return dueFlashcards;
  } else {
    throw Error("No due flashcards found");
  }
};

//the below method get one single flashcard based on the id
flashcardSchema.statics.getFlashcardById = async function (flashcardId) {
  const flashcard = await this.findById(flashcardId);
  if (flashcard) {
    return flashcard;
  } else {
    throw Error("No flashcard found");
  }
};

const Flashcard = mongoose.model("flashcard", flashcardSchema);
module.exports = Flashcard;
