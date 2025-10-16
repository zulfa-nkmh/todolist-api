import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to ToDoList API 🚀",
    available_routes: [
      "/api/users/register",
      "/api/users/login",
      "/api/todos"
    ]
  });
});
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.use((req, res) => res.status(404).json({ message: "Not found" }));


export default app;