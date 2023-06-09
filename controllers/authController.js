const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "net ninja secret", {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.send("Signup completed");
};

module.exports.login_get = (req, res) => {
  res.send("Signin completed");
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
    console.log("Login completed");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
    console.log("Login failed");
  }
};

module.exports.user_auth = (req, res) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "net ninja secret", async (err, decoded) => {
      if (err) {
        res.status(401).json({
          isAuthenticated: false,
          message: "Invalid or expired token",
        });
        console.log("auth failed");
      } else {
        try {
          const user = await User.getUserInfo(decoded.id);
          res.json({
            isAuthenticated: true,
            user: user,
          });
          console.log("auth completed");
        } catch (error) {
          console.log("Error: ", error);
          res.status(500).json({
            message: "Internal server error",
          });
        }
      }
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      message: "Authorization header is missing",
    });
    console.log("auth failed");
  }
};

// add a completed grammar lesson's number to the user's data
module.exports.add_completed_grammar_lesson = async (req, res) => {
  const { id, lessonNumber } = req.body;
  try {
    const updatedUser = await User.addCompletedGrammarLesson(id, lessonNumber);
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// add a completed vocabulary lesson's number to the user's data
module.exports.add_completed_vocab_lesson = async (req, res) => {
  const { id, lessonNumber } = req.body;
  try {
    const updatedUser = await User.addCompletedVocabLesson(id, lessonNumber);
    res.status(200).json({ user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// check if grammar lesson is completed
module.exports.check_grammar_lesson = async (req, res) => {
  const { id, lessonNumber } = req.body;
  try {
    const isCompleted = await User.checkGrammarLessonCompleted(
      id,
      lessonNumber
    );
    res.status(200).json({ isCompleted: isCompleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// check if vocabulary lesson is completed
module.exports.check_vocab_lesson = async (req, res) => {
  const { id, lessonNumber } = req.body;
  try {
    const isCompleted = await User.checkVocabLessonCompleted(id, lessonNumber);
    res.status(200).json({ isCompleted: isCompleted });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get completed grammar lessons
module.exports.get_completed_grammar_lessons = async (req, res) => {
  const { id } = req.body;
  try {
    const completedLessons = await User.getCompletedGrammarLessons(id);
    res.status(200).json({ completedLessons: completedLessons });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//get completed vocabulary lessons
module.exports.get_completed_vocab_lessons = async (req, res) => {
  const { id } = req.body;
  try {
    const completedLessons = await User.getCompletedVocabLessons(id);
    res.status(200).json({ completedLessons: completedLessons });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
