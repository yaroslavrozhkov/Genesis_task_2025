import express from "express";
import apiRoutes from "./routes/api";

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});