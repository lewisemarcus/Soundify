import { Router } from "express";
import User from "../../models/User.js";
const router = Router();

router.route("/user/:username").get(async (req, res) => {
  const userData = await User.find(req.params);

  res.json(userData);
});

export { router };
