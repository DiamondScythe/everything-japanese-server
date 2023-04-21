const mongoose = require("mongoose");
const { Schema } = mongoose;

const pageSchema = new Schema({
  page_id: Number,
  title: String,
  body: String,
  example: String,
  translation: String,
});

const lessonSchema = new Schema({
  type: String,
  title: String,
  chapter: Number,
  level: Number,
  page: [pageSchema],
});

lessonSchema.statics.getAllLessons = async function () {
  const lessons = await this.find({});
  if (lessons) {
    return lessons;
  } else {
    throw Error("No lessons found");
  }
};

const Lesson = mongoose.model("lesson", lessonSchema);
module.exports = Lesson;
