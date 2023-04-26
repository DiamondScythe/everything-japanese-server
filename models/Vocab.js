const mongoose = require("mongoose");
const { Schema } = mongoose;

const vocabPartSchema = new Schema({
  explanation: {
    type: String,
    required: true,
  },
  examples: [
    {
      word: {
        type: String,
        required: true,
      },
      furigana: {
        type: String,
        required: true,
      },
      example: {
        type: String,
        required: true,
      },
      translation: {
        type: String,
        required: true,
      },
      wordAudioFileName: {
        type: String,
        required: true,
        default: "N/A",
      },
      exampleAudioFileName: {
        type: String,
        required: true,
        default: "N/A",
      },
      imageFileName: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
  ],
});

const vocabSchema = new Schema({
  lessonNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
  },
  parts: {
    type: [vocabPartSchema],
    default: [],
  },
  difficulty: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
});

//the below is a static method that will be used to add one vocab to the database
vocabSchema.statics.addVocab = async function (vocab) {
  const newVocab = await this.create(vocab);
  if (newVocab) {
    return newVocab;
  } else {
    throw Error("No vocab added");
  }
};

//the below is a static method that will be used to get all vocab from the database
vocabSchema.statics.getAllVocab = async function () {
  const vocab = await this.find({});
  if (vocab) {
    return vocab;
  } else {
    throw Error("No vocab found");
  }
};

//the below is a static method that will push a new part to the parts array
vocabSchema.statics.addPart = async function (lessonNumber, part) {
  const updatedVocab = await this.findOneAndUpdate(
    { lessonNumber: lessonNumber },
    { $push: { parts: part } },
    { new: true }
  );
  if (updatedVocab) {
    return updatedVocab;
  } else {
    throw Error("No vocab found");
  }
};

const Vocab = mongoose.model("vocab", vocabSchema);
module.exports = Vocab;
