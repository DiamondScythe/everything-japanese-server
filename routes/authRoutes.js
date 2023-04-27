const { Router } = require("express");
const authController = require("../controllers/authController.js");

const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/userAuth", authController.user_auth);

//for lesson status
router.post(
  "/user/addCompletedGrammarLesson",
  authController.add_completed_grammar_lesson
);
router.post(
  "/user/addCompletedVocabLesson",
  authController.add_completed_vocab_lesson
);

router.get("/test", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
