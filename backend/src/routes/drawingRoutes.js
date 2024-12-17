import { Router } from "express";
import {
  createDrawing,
  deleteDrawing,
  updateDrawing,
  viewDrawing,
  viewDrawings,
} from "../controllers/drawingControllers.js";
import { auth } from "../middlewares/authmiddleware.js";

export const drawingRouter = Router();

drawingRouter.use(auth);
drawingRouter.post("/whiteboard", createDrawing);

drawingRouter.get("/whiteboards", viewDrawings);

drawingRouter.get("/whiteboard/:id", viewDrawing);

drawingRouter.put("/whiteboard/:id", updateDrawing);

drawingRouter.delete("/whiteboard/:id", deleteDrawing);
