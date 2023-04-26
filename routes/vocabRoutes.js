const { Router } = require("express");
const vocabController = require("../controllers/vocabController.js");

const router = Router();

router.get("/api/allVocab", grammarController.grammar_get);
router.get("/api/oneVocab/:id", grammarController.one_grammar_get);

module.exports = router;
