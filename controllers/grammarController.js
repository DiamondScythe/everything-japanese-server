const Grammar = require("../models/Grammar");

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
