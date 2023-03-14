const { Schema, model } = require("mongoose");

const festivalSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    dateBeginning: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateEnd: {
      type: Date,
      required: true,
      default: Date.now
    },
    location: {
        type: String,
        required: true
    },
    picture: String
  },
  {
    timestamps: true
  }
);

const Festival = model("Festival", festivalSchema);

module.exports = Festival;
