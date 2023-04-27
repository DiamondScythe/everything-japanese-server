const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  data: {
    completedLessons: {
      grammar: {
        type: [Number],
        default: [],
      },
      vocab: {
        type: [Number],
        default: [],
      },
    },
  },
});

// fire a function before doc saved to db. This is a mongoose middleware. Hashes the passwords.
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  // "this" is the User model itself
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

// static method to get user info based on id
userSchema.statics.getUserInfo = async function (id) {
  const user = await this.findOne({ _id: id }, { password: 0 });
  if (user) {
    return user;
  } else {
    console.log("id: " + id);
    throw Error("incorrect id");
  }
};

//static method to add a completed grammar lesson's number to the user's data
userSchema.statics.addCompletedGrammarLesson = async function (
  id,
  lessonNumber
) {
  const updatedUser = await this.findOneAndUpdate(
    { _id: id },
    { $push: { "data.completedLessons.grammar": lessonNumber } },
    { new: true }
  );
  if (updatedUser) {
    return updatedUser;
  } else {
    throw Error("No user found");
  }
};

//static method to add a completed vocab lesson's number to the user's data
userSchema.statics.addCompletedVocabLesson = async function (id, lessonNumber) {
  const updatedUser = await this.findOneAndUpdate(
    { _id: id },
    { $push: { "data.completedLessons.vocab": lessonNumber } },
    { new: true }
  );
  if (updatedUser) {
    return updatedUser;
  } else {
    throw Error("No user found");
  }
};

//check if a grammar lesson has been completed
userSchema.statics.checkGrammarLessonCompleted = async function (
  id,
  lessonNumber
) {
  const user = await this.findOne({ _id: id });
  if (user) {
    const completedLessons = user.data.completedLessons.grammar;
    if (completedLessons.includes(lessonNumber)) {
      return true;
    } else {
      return false;
    }
  } else {
    throw Error("No user found");
  }
};

//check if a vocab lesson has been completed
userSchema.statics.checkVocabLessonCompleted = async function (
  id,
  lessonNumber
) {
  const user = await this.findOne({ _id: id });
  if (user) {
    const completedLessons = user.data.completedLessons.vocab;
    if (completedLessons.includes(lessonNumber)) {
      return true;
    } else {
      return false;
    }
  } else {
    throw Error("No user found");
  }
};

// get completed grammar lessons
userSchema.statics.getCompletedGrammarLessons = async function (id) {
  const user = await this.findOne({ _id: id });
  if (user) {
    const completedLessons = user.data.completedLessons.grammar;
    return completedLessons;
  } else {
    throw Error("No user found");
  }
};

// get completed vocab lessons
userSchema.statics.getCompletedVocabLessons = async function (id) {
  const user = await this.findOne({ _id: id });
  if (user) {
    const completedLessons = user.data.completedLessons.vocab;
    return completedLessons;
  } else {
    throw Error("No user found");
  }
};

const User = mongoose.model("user", userSchema);

module.exports = User;
