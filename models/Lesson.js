const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [
    //array of references to the Vocab and Grammar models
    {
      type: Schema.Types.ObjectId,
      ref: "vocab",
    },
    {
      type: Schema.Types.ObjectId,
      ref: "grammar",
    },
  ],
});

lessonSchema.statics.getAllLessons = async function () {
  const lessons = await this.find({});
  if (lessons) {
    return lessons;
  } else {
    throw Error("No lessons found");
  }
};

//the below is a static method that will be used to add one lesson to the database
lessonSchema.statics.addLesson = async function (lesson) {
  const newLesson = await this.create(lesson);
  if (newLesson) {
    return newLesson;
  } else {
    throw Error("No lesson added");
  }
};

const Lesson = mongoose.model("lesson", lessonSchema);
module.exports = Lesson;
