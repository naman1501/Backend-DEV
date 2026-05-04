const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

const Student = mongoose.model("Student");

// 1. Average GPA by department
async function avgGPAByDept() {
  const result = await Student.aggregate([
    {
      $group: {
        _id: "$department",
        avgGPA: { $avg: "$gpa" }
      }
    }
  ]);
  console.log(result);
}

// 2. Most popular courses
async function popularCourses() {
  const result = await Student.aggregate([
    { $unwind: "$courses" },
    {
      $group: {
        _id: "$courses",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  console.log(result);
}

// 3. Student performance report
async function performanceReport() {
  const result = await Student.aggregate([
    {
      $project: {
        name: 1,
        gpa: 1,
        performance: {
          $cond: {
            if: { $gte: ["$gpa", 3.5] },
            then: "Excellent",
            else: {
              $cond: {
                if: { $gte: ["$gpa", 3.0] },
                then: "Good",
                else: "Average"
              }
            }
          }
        }
      }
    }
  ]);
  console.log(result);
}

module.exports = {
  avgGPAByDept,
  popularCourses,
  performanceReport
};
