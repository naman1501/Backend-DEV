const mongoose = require("mongoose");

// 1. Course Schema (with prerequisites)
const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  prerequisites: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  ]
});

// 2. Professor Schema (multiple departments)
const professorSchema = new mongoose.Schema({
  name: String,
  email: String,
  departments: [String]
});

// 3. Grade Schema (references)
const gradeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  grade: String,
  semester: String
});

const Course = mongoose.model("Course", courseSchema);
const Professor = mongoose.model("Professor", professorSchema);
const Grade = mongoose.model("Grade", gradeSchema);

module.exports = { Course, Professor, Grade };
