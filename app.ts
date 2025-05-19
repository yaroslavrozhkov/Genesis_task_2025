import express from "express";
import apiRoutes from "./src/routes/api";
import path from "path";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);
app.use("/", express.static(path.resolve(__dirname, "..", "public")));

const url = process.env.SERVICE_URL;

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server running at ${url}:${PORT}`);
});