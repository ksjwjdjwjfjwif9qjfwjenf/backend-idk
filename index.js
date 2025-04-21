import express from "express";
import { PrismaClient } from "./generated/prisma/index.js";
const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hii");
})
app.get("/users", async (req, res) => { 
  const users = await prisma.user.findMany();
    res.send(users);
  });

  app.post("/users", async (req, res) => {
    try {
      const { name, gmail, age } = req.body;
      const user = await prisma.user.create({
        data: {
          name,
          gmail,
          age
        }
      });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
app.listen(3000, () => {
  console.log("server is running on port 3000");
});