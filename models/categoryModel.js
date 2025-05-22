const mongoose = require("mongoose");

//schema
const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, " Category is required"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);