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

app.get("/", (_req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
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
  console.log("SIGNUP REQUEST");
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
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
});
