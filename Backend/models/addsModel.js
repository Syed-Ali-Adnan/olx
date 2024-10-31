const mongoose = require("mongoose");

const addsSchema = new mongoose.Schema({
    productName : String,
    description : String,
    image : String,
    category : String,
    productPrice : Number,
    author: { type: mongoose.Types.ObjectId, ref: "user" },
},
{
    timestamps: true,
  }
)

const Adds = mongoose.model("adds", addsSchema);

module.exports = Adds;