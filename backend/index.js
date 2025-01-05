import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./src/routes/authRoutes.js";
import { drawingRouter } from "./src/routes/drawingRoutes.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", authRouter);
app.use("/api/v1/drawing", drawingRouter);

app.listen(PORT, () => {
  console.log(`app is listening on PORT ${PORT}`);
});
