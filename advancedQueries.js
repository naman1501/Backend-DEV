const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

const Student = mongoose.model("Student");

// 1. GPA between 3.0 and 3.5
async function studentsInRange() {
  const result = await Student.find({
    gpa: { $gte: 3.0, $lte: 3.5 }
  });
  console.log(result);
}

// 2. Students with more than 5 courses
async function moreThan5Courses() {
  const result = await Student.find({
    courses: { $size: 6 } // OR use $expr for >5
  });
  console.log(result);
}

// 3. Top 10 students by GPA
async function topStudents() {
  const result = await Student.find()
    .sort({ gpa: -1 })
    .limit(10);
  console.log(result);
}

// 4. Count students by city
async function countByCity() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$city",
        count: { $sum: 1 }
      }
    }
  ]);
  console.log(result);
}

module.exports = {
  studentsInRange,
  moreThan5Courses,
  topStudents,
  countByCity
};
