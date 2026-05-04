const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentDB");

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  gpa: Number,
  courses: [String],
  city: String,
  department: String
});

const Student = mongoose.model("Student", studentSchema);

// 1. Add new student
async function addStudent() {
  const student = new Student({
    name: "Rahul",
    email: "rahul@example.com",
    gpa: 3.2,
    courses: ["Math", "CS"],
    city: "Delhi",
    department: "CSE"
  });
  await student.save();
  console.log("Student added");
}

// 2. View all students
async function viewStudents() {
  const students = await Student.find();
  console.log(students);
}

// 3. Find by email
async function findStudent(email) {
  const student = await Student.findOne({ email });
  console.log(student);
}

// 4. Update GPA
async function updateGPA(email, newGPA) {
  await Student.updateOne({ email }, { gpa: newGPA });
  console.log("GPA updated");
}

// 5. Delete student
async function deleteStudent(email) {
  await Student.deleteOne({ email });
  console.log("Student deleted");
}

module.exports = {
  addStudent,
  viewStudents,
  findStudent,
  updateGPA,
  deleteStudent
};
