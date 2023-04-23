const { Router } = require("express");
const grammarController = require("../controllers/grammarController.js");

const router = Router();

router.get("/allGrammar", grammarController.grammar_get);
router.post("/oneGrammar", grammarController.grammar_post);
router.post("/addPart", grammarController.add_part);
router.get("/oneGrammar", grammarController.one_grammar_get);

module.exports = router;
