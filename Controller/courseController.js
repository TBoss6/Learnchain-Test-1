import { courses } from "../data/data.js";

// Get all available courses
export const getCourses = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong while fetching courses",
    });
  }
};
