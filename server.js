import express from "express";
import authRoutes from "./routes/authRoute.js";
import coursesRoutes from "./routes/courseRoute.js";
import enrollRoutes from "./routes/enrollRoute.js";

const app = express();

app.use(express.json()); // Middleware for parsing JSON

const PORT = 5500;

// USE ROUTES
app.get("/", (req, res) => {
  res.send("WELCOME TO LEARNCHAIN...");
});
app.use("/auth", authRoutes);
app.use("/enroll", enrollRoutes);
app.use("/courses", coursesRoutes);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: `Cannot find ${req.originalUrl} on the server`,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
