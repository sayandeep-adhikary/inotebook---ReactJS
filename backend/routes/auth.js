const Router = require("express");
const router = Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "sayandeepisagoodboyandhelovestocode";

// ROUTE 1: Create a User using POST "/api/auth/createuser", No Login Required
router.post(
  "/createuser",
  [
    body("email", "Enter a VALID email!").isEmail(),
    body("name", "Name must be of at least 3 characters").isLength({ min: 3 }),
    body("password", "Password must be of at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors, return the error
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      securePassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 2: Authenticate a user using: POST "/api/auth/login", No Login Required
router.post(
  "/login",
  [
    body("email", "Enter a VALID email!").isEmail(),
    body("password", "Password can not be blank!").exists(),
  ],
  async (req, res) => {
    // If there are errors, return the error
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get LoggedIn user details using: POST "/api/auth/getuser", Login Required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
      const userid = req.user.id;
      const user = await User.findById(userid).select("-password")
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports = router;
