const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Bug = new Schema(
  {
    BugId: {
      type: String,
      unique: false,
      require: true
    },
    Channel: {
      type: String,
      require: true
    },
    Service: {
      type: String,
      require: true
    },
    Description:{
        type: String,
        require: true
    },
    NumberInSnow: {
      type: String,
      require: true
    },
    Status: {
      type: String,
      require: true
    },
    NumberInTheSystem: {
      type: String,
      require: true
    },
    VersionForProd: {
      type: String,
      require: true
    }
  },
  { collection: "production-bugs" }
);

module.exports = mongoose.model("production-bugs", Bug);