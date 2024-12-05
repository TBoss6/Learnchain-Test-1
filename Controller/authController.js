import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const usersFilePath = path.resolve("./data/users.json");

// Helper function to read users from the JSON file
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([])); // Create file if it doesn't exist
  }
  const fileContent = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(fileContent);
};

// Helper function to write users to the JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register a new User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "One or more fields are missing! Please fill these required fields.",
      });
    }

    const users = readUsersFromFile();

    // Checking for unique email
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: users.length + 1, name, email, hashedPassword };
    users.push(newUser);

    // Save updated users list to the file
    writeUsersToFile(users);

    res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      data: { newUser },
    });

    console.log("Updated Users List:", users);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};

// Login a User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Load existing users
    const users = readUsersFromFile();

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).json({ message: "Email is not registered." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res
      .status(200)
      .json({ message: "Login successful.", token: "dummy-token" });
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};
