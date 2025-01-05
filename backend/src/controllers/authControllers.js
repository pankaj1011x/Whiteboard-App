import { prisma } from "../config/db.js";
import sgMail from "@sendgrid/mail";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signinSchema, signupSchema } from "../validators/authValidators.js";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

export async function forgotPassword(req, res) {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return res.status(404).json({ error: "Email not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const msg = {
      to: email,
      from: "pankajnvrqts@gmail.com",
      subject: "Password Reset Request",
      text: `We received a request to reset your password. Click the link below to reset your password:
      
      ${resetLink}
      
      If you did not request this, please ignore this email.`,
      html: `
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a href=${resetLink}>Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.status(201).json({
          msg: "Email sent",
        });
      })
      .catch((error) => {
        res.status(404).json({
          msg: "something went wrong while sending email",
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function resetPassword(req, res) {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  try {
    const response = await prisma.passwordResetToken.findUnique({
      where: {
        token: hashedToken,
      },
    });

    if (!response) {
      return res.status(400).json({
        msg: "Invalid or expired token",
      });
    }

    if (response.expiresAt < new Date()) {
      return res.status(400).json({ msg: "Token has expired" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        id: response.userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    await prisma.passwordResetToken.delete({
      where: {
        id: response.id,
      },
    });
    return res.status(200).json({ msg: "Password reset successfully" });
  } catch (err) {
    return res.status(500).json({
      msg: `error while reseting password,${err}`,
    });
  }
}
