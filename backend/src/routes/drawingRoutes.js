import { Router } from "express";

export const drawingRouter = Router();

drawingRouter.post("/whiteboard", (req, res) => {
  res.json({
    msg: "white board created",
  });
});

drawingRouter.get("/whiteboards", (req, res) => {
  res.json({
    msg: "your white boards are being displayed",
  });
});

drawingRouter.get("/whiteboard:id", (req, res) => {
  res.json({
    msg: "your requested whiteboard",
  });
});

drawingRouter.put("/whiteboard:id", (req, res) => {
  res.json({
    msg: "your updated whiteboard",
  });
});

drawingRouter.delete("/whiteboard:id", (req, res) => {
  res.json({
    msg: "your  whiteboard has been deleted",
  });
});
