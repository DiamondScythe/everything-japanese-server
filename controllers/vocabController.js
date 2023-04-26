const Vocab = require("../models/Vocab");
const synthesizeText = require("../helpers/gg-tts-api.js");
const crypto = require("crypto");

//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // specify the directory where uploaded files will be saved
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split(".").pop();
    const filename = crypto.randomBytes(8).toString("hex") + "." + extension;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // limit file size to 100 MB
}).array("images[]", 10); // process up to 10 files uploaded with the name 'exampleImage'

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

module.exports.one_vocab_get = async (req, res) => {
  //get one vocab in a try catch block
  try {
    const vocab = await Vocab.findOne({
      lessonNumber: req.params.id,
    });
    res.json({
      vocab: vocab,
    });
  } catch (err) {
    console.log(err);
    //res error message
    res.status(400).json({
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
  // use Multer to handle form data
  upload(req, res, async function (err) {
    if (err) {
      console.log(err);
      res.json({
        message: "File upload failed",
        error: err,
      });
    } else {
      const part = JSON.parse(req.body.part); // parse the JSON string in req.body.part
      console.log(req.files); // log the uploaded files
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

          const imageFileName = req.files[i].filename;
          part.examples[i].imageFileName = imageFileName;
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
    }
  });
};
