const Report = require("../models/reportModel");
const mongoose = require("mongoose");

// get all reports
const getReports = async (req, res) => {
  const user_id = req.user._id;

  const reports = await Report.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(reports);
};

// get a single report
const getReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such report" });
  }

  const report = await Report.findById(id);

  if (!report) {
    return res.status(404).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

// create a new report
const createReport = async (req, res) => {
  const { subject, grade } = req.body;

  const emptyFields = [];

  if (!subject) {
    emptyFields.push("subject");
  }
  if (!grade) {
    emptyFields.push("grade");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const user_id = req.user._id; // _id comes from the middleware requireAuth
    const report = await Report.create({ subject, grade, user_id });
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such report" });
  }

  const report = await Report.findOneAndDelete({ _id: id });

  if (!report) {
    return res.status(400).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

// update a report
const updateReport = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such report" });
  }

  const report = await Report.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!report) {
    return res.status(400).json({ error: "No such report" });
  }

  res.status(200).json(report);
};

module.exports = {
  getReports,
  getReport,
  createReport,
  deleteReport,
  updateReport,
};
