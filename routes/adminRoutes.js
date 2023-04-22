const { Router } = require("express");
const adminController = require("../controllers/grammarController.js");

const router = Router();

router.get("/allGrammar", adminController.grammar_get);
router.post("/oneGrammar", adminController.grammar_post);

module.exports = router;
