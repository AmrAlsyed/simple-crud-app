import express from "express";
import cors from "cors";
import clientRoutes from "./routes/clientRoute.js";
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", clientRoutes);

app.listen(port, () => {
  console.log("Listening on port 3000");
});
