const mongoose = require("mongoose");
const { Schema } = mongoose;

const grammarPartSchema = new Schema({
  explanation: {
    type: String,
    required: true,
  },
  examples: [
    {
      example: {
        type: String,
        required: true,
      },
      translation: {
        type: String,
        required: true,
      },
      exampleAudioFileName: {
        type: String,
        required: true,
        default: "N/A",
      },
    },
  ],
});

const grammarSchema = new Schema({
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
    type: [grammarPartSchema],
    default: [],
  },
  difficulty: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

//the below is a static method that will be used to add one grammar entry to the database
grammarSchema.statics.addGrammar = async function (grammar) {
  const newGrammar = await this.create(grammar);
  if (newGrammar) {
    return newGrammar;
  } else {
    throw Error("No grammar entry added");
  }
};

//the below is a static method that will be used to get all grammar entries from the database
grammarSchema.statics.getAllGrammar = async function () {
  const grammarList = await this.find({});
  if (grammarList) {
    return grammarList;
  } else {
    throw Error("No grammar entries found");
  }
};

//the below static will push a new part to the parts array
grammarSchema.statics.addPart = async function (lessonNumber, part) {
  const updatedGrammar = await this.findOneAndUpdate(
    { lessonNumber: lessonNumber },
    { $push: { parts: part } },
    { new: true }
  );
  if (updatedGrammar) {
    return updatedGrammar;
  } else {
    throw Error("No grammar entry updated");
  }
};

//the below static method will get a grammar lesson's summary
grammarSchema.statics.getSummary = async function (lessonNumber) {
  const grammar = await this.findOne({ lessonNumber: lessonNumber });
  if (grammar) {
    return grammar.summary;
  } else {
    throw Error("No grammar entry found");
  }
};

//delete a grammar part from a grammar entry based on the lesson number and part _id
grammarSchema.statics.deletePart = async function (lessonNumber, partId) {
  const updatedGrammar = await this.findOneAndUpdate(
    { lessonNumber: lessonNumber },
    { $pull: { parts: { _id: partId } } },
    { new: true }
  );
  if (updatedGrammar) {
    return updatedGrammar;
  } else {
    throw Error("No grammar entry updated");
  }
};

const Grammar = mongoose.model("grammar", grammarSchema);
module.exports = Grammar;
