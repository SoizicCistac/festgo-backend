const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const foodStandSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    festival: {
        type: Schema.Types.ObjectId,
        ref: "Festival",
        required: true
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const FoodStand = model("FoodStand", foodStandSchema);

module.exports = FoodStand;
