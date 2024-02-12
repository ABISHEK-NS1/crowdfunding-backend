import cors from "cors";
import express from "express";

import { checkForName, signUp } from "./src/controllers/authController.js";
import { connectDb } from "./src/lib/db.js";

connectDb();

const app = express();
const PORT = 5172;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/auth/checkForName", checkForName);
app.post("/api/auth/sign-up", signUp);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
