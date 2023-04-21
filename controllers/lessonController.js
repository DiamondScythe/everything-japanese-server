const Lesson = require("../models/Lesson.js");

// controller actions
module.exports.lesson_get = async (req, res) => {
  const lessons = await Lesson.getAllLessons();
  res.json({
    lessons: lessons,
  });
};
