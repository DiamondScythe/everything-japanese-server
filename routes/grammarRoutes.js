const { Router } = require("express");
const grammarController = require("../controllers/grammarController.js");

const router = Router();

router.get("/api/allGrammar", grammarController.grammar_get);
router.get("/api/oneGrammar/:id", grammarController.one_grammar_get);

router.get("/api/grammarSummary/:id", grammarController.summary_get);

module.exports = router;
