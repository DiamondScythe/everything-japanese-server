const mongoose = require("mongoose");
const { Schema } = mongoose;

const grammarSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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
    },
  ],
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

const Grammar = mongoose.model("grammar", grammarSchema);
module.exports = Grammar;
