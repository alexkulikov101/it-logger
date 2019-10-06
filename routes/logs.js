const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

//GET
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//POST
router.post("/", async (req, res) => {
  const { message, attention, tech } = req.body;
  try {
    const newLog = new Log({
      message,
      attention,
      tech
    });

    const log = await newLog.save();
    res.json(log);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    let log = await Log.findById(req.params.id);

    if (!log) return res.status(404).json({ msg: "Log not found" });

    await Log.findByIdAndRemove(req.params.id);

    res.json({ msg: "Log removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//PUT
router.put("/:id", async (req, res) => {
  const { message, attention, tech, date } = req.body;

  // Build log object
  const logFields = {};
  logFields.message = message;
  logFields.attention = attention;
  logFields.tech = tech;
  logFields.date = date;

  try {
    let log = await Log.findById(req.params.id);

    if (!Log) return res.status(404).json({ msg: "Log not found" });

    log = await Log.findByIdAndUpdate(
      req.params.id,
      { $set: logFields },
      { new: true }
    );

    res.json(log);
  } catch (err) {
    console.error(er.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
