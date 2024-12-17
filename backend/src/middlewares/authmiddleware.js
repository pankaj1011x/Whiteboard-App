import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function auth(req, res, next) {
  const auth = req.header("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or invalid" });
  }
  const token = auth.split(" ")[1];
  const secretKey = process.env.JWT_SECRET;
  const response = jwt.verify(token, secretKey);

  if (response) {
    req.user = response;
    next();
  } else {
    return res.status(403).json({
      message: "unauthorized",
    });
  }
}
