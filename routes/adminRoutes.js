const { Router } = require("express");
const grammarController = require("../controllers/grammarController.js");
const vocabController = require("../controllers/vocabController.js");

const router = Router();

router.get("/allGrammar", grammarController.grammar_get);
router.post("/oneGrammar", grammarController.grammar_post);
router.post("/addGrammarPart", grammarController.add_part);
router.get("/oneGrammar", grammarController.one_grammar_get);

router.get("/allVocab", vocabController.vocab_get);
router.post("/oneVocab", vocabController.vocab_post);
router.post("/addVocabPart", vocabController.add_part);
// router.get("/oneVocab", vocabController.one_vocab_get);

module.exports = router;
