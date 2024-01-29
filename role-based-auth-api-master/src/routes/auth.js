const express = require("express");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { newUserValidator } = require("../middleware/validator");
const {
  createUser,
  signin,
  privateResponse,
  adminResponse,
  sendProfile,
} = require("../controllers/auth");

const authRouter = express.Router();

const isAuth = async (req, res, next) => {
  try {
    const authorizationToken = req.headers.authorization;
    const token = authorizationToken?.split("Bearer ")[1];
    if (!token) return res.status(403).json({ error: "unauthorized access!" });

    const payload = jwt.verify(token, "secret");
    const user = await UserModel.findById(payload.id);
    if (!user) return res.status(403).json({ error: "unauthorized access!" });

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ error: "unauthorized access!" });
    } else {
      res.status(500).json({ error: "Something went wrong!" });
    }
  }
};

const isAdmin = async (req, res, next) => {
  if (req.user.role === "admin") next();
  else res.status(403).json({ error: "Protected only for admin!" });
};

authRouter.post("/signup",  createUser);
 authRouter.post("/signin", signin);

authRouter.get("/admin", isAuth, isAdmin, adminResponse);

module.exports = authRouter;
