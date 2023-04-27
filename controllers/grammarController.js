const Grammar = require("../models/Grammar");
const synthesizeText = require("../helpers/gg-tts-api.js");

// controller actions
module.exports.grammar_get = async (req, res) => {
  //get all grammar in a try catch block
  try {
    const grammarList = await Grammar.getAllGrammar();
    res.json({
      grammarList: grammarList,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

module.exports.grammar_post = async (req, res) => {
  //add one grammar in a try catch block
  try {
    const grammar = await Grammar.addGrammar(req.body);
    res.json({
      grammar: grammar,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

module.exports.add_part = async (req, res) => {
  const part = req.body.part;
  try {
    //for each example inside part.example array, run the synthesizeText function
    for (let i = 0; i < part.examples.length; i++) {
      const audioFileName = await synthesizeText(part.examples[i].example);
      //add the audio file name to the example object as a property
      part.examples[i].exampleAudioFileName = audioFileName;
    }
  } catch (err) {
    console.log(err);
  }
  //add one part to a grammar entry in a try catch block
  try {
    const updatedGrammar = await Grammar.addPart(req.body.lessonNumber, part);
    res.json({
      updatedGrammar: updatedGrammar,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

module.exports.one_grammar_get = async (req, res) => {
  //get one grammar entry in a try catch block
  try {
    const grammar = await Grammar.findOne({
      lessonNumber: req.params.id,
    });
    res.json({
      grammar: grammar,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

module.exports.summary_get = async (req, res) => {
  //get a grammar's summary based on the lesson number
  try {
    const summary = await Grammar.getSummary(req.params.id);
    res.json({
      summary: summary,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

//delete a part from a grammar entry in a try catch block
module.exports.delete_grammar_part = async (req, res) => {
  try {
    const updatedGrammar = await Grammar.deletePart(
      req.body.lessonNumber,
      req.body.partId
    );
    res.json({
      updatedGrammar: updatedGrammar,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

//update a grammar entry in a try catch block
module.exports.update_grammar = async (req, res) => {
  try {
    const updatedGrammar = await Grammar.findOneAndUpdate(
      { lessonNumber: req.body.lessonNumber },
      req.body.grammar,
      { new: true }
    );
    res.json({
      updatedGrammar: updatedGrammar,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};

//delete a grammar entry in a try catch block
module.exports.delete_grammar_lesson = async (req, res) => {
  try {
    const deletedGrammar = await Grammar.findOneAndDelete({
      lessonNumber: req.body.lessonNumber,
    });
    res.json({
      deletedGrammar: deletedGrammar,
    });
  } catch (err) {
    console.log(err);
    res.status(400);
  }
};
