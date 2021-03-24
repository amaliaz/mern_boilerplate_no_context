const express = require("express");

const router = express.Router();
const User = require("../models/User");
const uploader = require("./../configs/cloudinary");
const isLoggedIn = require("./../middlewares/isLoggedIn");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post(
  "/signup",
  uploader.single("pictureUrl"),
  (req, res, next) => {
    const { email, password, name } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password required" });
      return;
    }

    User.findOne({ email })
      .then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ message: "Email already exists" });
          return;
        }

        const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

        const newUser = {
          email,
          name,
          password: hashedPassword,
        };

        if (req.file) {
          newUser.pictureUrl = req.file.path;
        }

        User.create(newUser)
          .then((createdUser) => {
            res.status(201).json(createdUser);
          })
          .catch((error) => {
            next(error);
          });
      })
      .catch((error) => {
        next(error);
      });
  }
);

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(400).json({ message: "tttt" });
        return;
      }

      const isSamePassword = bcrypt.compareSync(password, foundUser.password);
      if (!isSamePassword) {
        res.status(400).json({ message: "Bad credentials" });
        return;
      }

      req.session.currentUser = {
        _id: foundUser._id
      };

      res.redirect("/api/current-user");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/current-user", isLoggedIn, (req, res, next) => {
  User.findById(req.session.currentUser._id)
    .select("-password")
    .then((currentUser) => {
      res.status(200).json(currentUser);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json({ message: "Successfuly logged out" });
  });
});

module.exports = router;
