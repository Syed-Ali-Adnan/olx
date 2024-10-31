const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://devsyedaliadnan:test123@olx.2wdwc.mongodb.net/?retryWrites=true&w=majority&appName=olx"
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Error in DB connection", err);
    });
};
