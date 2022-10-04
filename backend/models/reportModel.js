const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolReportSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", schoolReportSchema);
