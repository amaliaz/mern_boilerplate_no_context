const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    picture: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StreetArt", schema);