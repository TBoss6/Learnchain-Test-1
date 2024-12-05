import fs from "fs";
import path from "path";
import { courses } from "../data/data.js";

const enrollmentsFilePath = path.resolve("./data/enrollments.json");
const usersFilePath = path.resolve("./data/users.json");

// Helper function to read data from a file
const readFromFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Helper function to write data to a file
const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Enroll a User in a Course
export const enrollUser = (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    // Validate input
    if (!user_id || !course_id) {
      return res.status(400).json({
        message: "Both user_id and course_id are required.",
      });
    }

    // Load users and enrollments data from files
    const users = readFromFile(usersFilePath);
    const enrollments = readFromFile(enrollmentsFilePath);

    // Validate user
    const user = users.find((user) => user.id === parseInt(user_id));
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Validate course
    const course = courses.find((course) => course.id === parseInt(course_id));
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if user is already enrolled
    const alreadyEnrolled = enrollments.find(
      (enrollment) =>
        enrollment.user.id === user.id && enrollment.course.id === course.id
    );
    if (alreadyEnrolled) {
      return res.status(400).json({
        message: "User is already enrolled in this course.",
      });
    }

    // Create new enrollment
    const newEnrollment = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      course: {
        id: course.id,
        title: course.title,
        description: course.description,
      },
    };

    // Update enrollments and save to file
    enrollments.push(newEnrollment);
    writeToFile(enrollmentsFilePath, enrollments);

    // Respond with success message
    res.status(201).json({
      status: "success",
      message: "User enrollment Successful",
      data: newEnrollment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
