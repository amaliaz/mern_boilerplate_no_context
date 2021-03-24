const express = require("express");
const StreetArt = require("../models/StreetArt");
const Visit = require("../models/Visit");
const isLoggedIn = require("./../middlewares/isLoggedIn");
const router = express.Router();
const User = require("../models/User");

// Route protected for logged in user
router.get("/my-visits", isLoggedIn, (req, res, next) => {
  Visit.find({ _user: { $eq: req.session.currentUser } })
    .populate("_streetArt")
    .then((visits) => {
      res.json(visits);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/my-visits", isLoggedIn, (req, res, next) => {
  let newVisit = { _user: req.session.currentUser, ...req.body };
  Visit.create(newVisit)
    .then((dbRes) => {
      res.json(dbRes);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/my-visits/:visitId", isLoggedIn, (req, res, next) => {
  Visit.findById(req.params.visitId)
    .then((dbRes1) => {
        if (dbRes1._user.toString() !== req.session.currentUser._id.toString()) {
        console.log("WRONG");
      } else {
        Visit.findByIdAndDelete(req.params.visitId).then(() => {
          res.status(200).json({ message: "Finally deleted" });
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
