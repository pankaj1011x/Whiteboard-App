import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../validators/authValidators.js";
dotenv.config();

export async function signupController(req, res) {
  const { name, email, password } = req.body;
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "invalid inputs",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign(user.id, JWT_SECRET);
    return res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(411).json({
      msg: "error while signing up",
    });
  }
}

export async function signinController(req, res) {
  const result = signinSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      msg: "invalid inputs",
    });
  }
  const JWT_SECRET = process.env.JWT_SECRET;
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "user not found",
      });
    }
    const validatepassword = await bcrypt.compare(password, user.password);
    if (!validatepassword) {
      return res.status(401).json({
        msg: "incorrect password",
      });
    }

    const token = jwt.sign(user.id, JWT_SECRET);
    return res.status(200).json({
      token,
    });
  } catch (err) {
    return res.status(403).json({
      msg: `error while signing in ${err}`,
    });
  }
}
