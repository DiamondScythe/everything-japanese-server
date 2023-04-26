const { Router } = require("express");
const vocabController = require("../controllers/vocabController.js");

const router = Router();

router.get("/api/allVocab", vocabController.vocab_get);
router.get("/api/oneVocab/:id", vocabController.one_vocab_get);

module.exports = router;
