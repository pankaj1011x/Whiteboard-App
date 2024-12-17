import { prisma } from "../config/db.js";

export const createDrawing = async (req, res) => {
  const { content } = req.body;
  const userId = req.user;
  try {
    const drawing = await prisma.drawing.create({
      data: {
        content,
        userId,
      },
    });
    return res.status(201).json({
      msg: "drawing created successfully",
      drawing,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "failed to create a drawing",
    });
  }
};

export const viewDrawings = async (req, res) => {
  try {
    const drawings = await prisma.drawing.findMany({
      select: {
        id: true,
        content: true,
        userId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      drawings,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "unable to view drawings",
    });
  }
};

export const viewDrawing = async (req, res) => {
  const id = req.params.id;
  try {
    const drawing = await prisma.drawing.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        content: true,
        userId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(201).json({
      msg: "drawing displayed",
      drawing,
    });
  } catch (err) {
    res.status(500).json({
      msg: "cannot view drawing",
    });
  }
};

export const updateDrawing = async (req, res) => {
  const id = req.params.id;
  const { content } = req.body;
  try {
    const drawing = await prisma.drawing.update({
      data: {
        content,
      },
      where: {
        id,
      },
    });
    return res.status(201).json({
      msg: "drawing updated",
      drawing,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "updation failed",
    });
  }
};

export const deleteDrawing = async (req, res) => {
  const id = req.params.id;

  try {
    await prisma.drawing.delete({
      where: {
        id,
      },
    });
    return res.status(201).json({
      msg: "drawing deleted",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "deletion not completed",
    });
  }
};
