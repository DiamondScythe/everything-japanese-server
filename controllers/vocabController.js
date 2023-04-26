const Vocab = require("../models/Vocab");
const synthesizeText = require("../helpers/gg-tts-api.js");

// controller actions

module.exports.vocab_get = async (req, res) => {
  //get all vocab in a try catch block
  try {
    const vocabList = await Vocab.getAllVocab();
    res.json({
      vocabList: vocabList,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};

module.exports.vocab_post = async (req, res) => {
  //add one vocab in a try catch block
  try {
    const vocab = await Vocab.addVocab(req.body);
    res.json({
      vocab: vocab,
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
      const exampleAudioFileName = await synthesizeText(
        part.examples[i].example
      );
      const wordAudioFileName = await synthesizeText(part.examples[i].word);
      //add the audio file name to the example object as a property
      part.examples[i].exampleAudioFileName = exampleAudioFileName;
      part.examples[i].wordAudioFileName = wordAudioFileName;
    }
  } catch (err) {
    console.log(err);
  }
  //add one part to a vocab entry in a try catch block
  try {
    const updatedVocab = await Vocab.addPart(req.body.lessonNumber, part);
    res.json({
      updatedVocab: updatedVocab,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err,
    });
  }
};
