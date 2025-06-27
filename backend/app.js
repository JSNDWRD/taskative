import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaClient } from "./generated/prisma/index.js";
import bcrypt from "bcrypt";

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT;

app.use(cors()); // Enable cors for all origins, specify later
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  // Auth succeed
  const userCopy = { ...user };
  delete userCopy.password;
  delete userCopy.role;

  res.json({
    message: "Login successful",
    user: userCopy,
    session: { id: user.id, currentUser: userCopy },
  });
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, age } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        age: age,
      },
    });
    res.status(201).json({
      message: "User created",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

// Task Tracker
// app.get("/task/:taskId", async (req, res) => {
//   const { taskId } = req.params;
//   try {
//     const body = await prisma.task.findUnique({ where: { id: taskId } });
//     res.status(200).json(body);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.get("/task/:authorId", async (req, res) => {
  const { authorId } = req.params;
  try {
    const body = await prisma.task.findMany({
      where: { authorId: parseInt(authorId) },
      orderBy: [{ startAt: "asc" }],
    });
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/task", async (req, res) => {
  const { authorId, title, status, priority, startAt, endAt } = req.body;
  try {
    await prisma.task.create({
      data: {
        authorId: authorId,
        title: title,
        status: status,
        priority: priority,
        startAt: startAt || new Date(),
        endAt: endAt || new Date(),
      },
    });
    res.status(201).json({ message: "Task created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { title, status, priority, startAt, endAt } = req.body;
  try {
    await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: {
        title: title,
        status: status,
        priority: priority,
        startAt: startAt,
        endAt: endAt,
      },
    });
    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/task/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    await prisma.task.delete({ where: { id: parseInt(taskId) } });
    res.status(204).json({ message: "Task deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Note Taking
app.get("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    const body = await prisma.note.findUnique({ where: { id: noteId } });
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/note", async (req, res) => {
  const { authorId } = req.body;
  try {
    const body = await prisma.note.findMany({ where: { authorId: authorId } });
    res.status(200).json(body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/note", async (req, res) => {
  const { author, title, description, content } = req.body;
  try {
    await prisma.note.create({
      data: {
        author: author,
        title: title,
        description: description,
        content: content,
      },
    });
    res.status(201).json({ message: "Note created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { title, description, content } = req.body;
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: {
        title: title,
        description: description,
        content: content,
      },
    });
    res.status(200).json({ message: "Note updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/note/:noteId", async (req, res) => {
  const { noteId } = req.params;
  try {
    await prisma.note.delete({ where: { id: noteId } });
    res.status(204).json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
