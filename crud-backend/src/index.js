import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", clientRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
