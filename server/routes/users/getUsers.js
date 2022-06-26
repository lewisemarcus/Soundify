import { Router } from "express";
import User from "../../models/User.js";
const router = Router();

router.route("/users").get(async (req, res) => {
  const userData = await User.find();

  res.json(userData);
});

export { router };
