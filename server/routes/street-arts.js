const express = require("express");
const router = express.Router();
require("dotenv").config();
const StreetArt = require("./../models/StreetArt");
const uploader = require("./../configs/cloudinary");

router.get("/", (req, res, next) => {
  StreetArt.find()
    .then((arts) => {
      res.json(arts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/:streetArtId", (req, res, next) => {
    StreetArt.findById(req.params.id)
    .then((art) => {
      res.status(200).json(art);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/", uploader.single("picture"), (req, res, next) => {
    const {location} = req.body;
    let pictureUrl = req.file.path;
    StreetArt.create({location, pictureUrl})
      .then((art) => {
        res.json(art);
      })
      .catch((error) => {
        console.log(error);
      });
  });

module.exports = router;
