const mongoose = require("mongoose");
const { Schema } = mongoose;

const vocabSchema = new Schema({
  word: {
    type: String,
    required: true,
  },
  furigana: {
    type: String,
    required: true,
  },
  meanings: [
    {
      meaning: {
        type: String,
        required: true,
      },
      notes: {
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
    },
  ],
  illustration: {
    filePath: {
      type: String,
      required: function () {
        return !!this.illustration; // Only required if illustration is present
      },
    },
    caption: {
      type: String,
      required: function () {
        return !!this.illustration; // Only required if illustration is present
      },
    },
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

const Vocab = mongoose.model("vocab", vocabSchema);
module.exports = Vocab;
