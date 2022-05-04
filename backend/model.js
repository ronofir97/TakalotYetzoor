const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Bug = new Schema(
  {
    BugId: {
      type: Number
    },
    Channel: {
      type: String
    },
    Service: {
      type: String
    },
    Description:{
        type: String
    }
  },
  { collection: "production-bugs" }
);

module.exports = mongoose.model("production-bugs", Bug);