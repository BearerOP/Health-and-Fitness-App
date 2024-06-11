const mongoose = require("mongoose");
const user_model = require("../models/user_model.js");
const sleep_model = require("../models/sleep_model.js");

exports.sleep_duration_add = async (req, res) => {
  try {
    // Check if req.user exists and has _id property
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const sleepTime = Date.now();

    // Find the user
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if sleep data already exists
    const sleepData = await sleep_model.findOne({ user_id: user._id });

    if (!sleepData) {
      // Create new sleep data
      const newSleepData = new sleep_model({
        user_id: user._id,
        record: [{ sleepTime }],
      });
      const savedSleepData = await newSleepData.save();
      if (savedSleepData) {
        return {
          success: true,
          message: "Sleep starting entry added successfully",
        };
      }
    } else {
      // Update existing sleep data
      sleepData.record.push({ sleepTime });
      const updatedSleepData = await sleepData.save();
      if (updatedSleepData) {
        return {
          success: true,
          message: "Sleep starting entry added successfully",
        };
      }
    }
    return {
      success: false,
      message: "Internal server error",
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error,
    };
  }
};

const calculateDuration = (startTime, endTime) => {
  const diff = endTime - startTime; // difference in milliseconds
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { hours, minutes };
};

exports.sleep_duration_end = async (req, res) => {
  try {
    let { sleepQuality, sleep_id } = req.body;
    const sleepObjectId = new mongoose.Types.ObjectId(sleep_id);
    const wakeTime = Date.now();
    // Check if req.user exists and has _id property
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Find the user
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Check if sleep data already exists
    const sleepData = await sleep_model.findOne({ user_id: user._id });
    let entryFound = false;

    sleepData.record.forEach((entry) => {
      if (entry._id.equals(sleepObjectId)) {
        entry.wakeTime = wakeTime;
        entry.sleepQuality = sleepQuality;
        const duration = calculateDuration(entry.sleepTime, wakeTime);
        entry.duration.hour = duration.hours;
        entry.duration.minute = duration.minutes;

        entryFound = true;
      }
    });

    if (!entryFound) {
      return {
        success: false,
        message: "Sleep entry not found",
      };
    }

    const updatedSleepData = await sleepData.save();
    if (updatedSleepData) {
      return {
        success: true,
        message: "Sleep ending entry added successfully",
      };
    } else {
      return {
        success: false,
        message: "Sleep ending entry not added",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error,
    };
  }
};

exports.sleep_view_all = async (req, res) => {
  try {
    // Check if req.user exists and has _id property
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const sleepData = await sleep_model.findOne({ user_id: user._id });
    if (!sleepData) {
      return {
        success: false,
        message: "No sleep data found",
      };
    }
    return {
      success: true,
      message: "Sleep data fetched successfully",
      data: sleepData.record,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error,
    };
  }
};

exports.sleep_view = async (req, res) => {
  try {
    const { sleep_id } = req.body;
    const sleepObjectId = new mongoose.Types.ObjectId(sleep_id);
    // Check if req.user exists and has _id property
    if (!req.user || !req.user._id) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const sleepData = await sleep_model.findOne({ user_id: user._id }).exec();
    if (!sleepData) {
      return {
        success: false,
        message: "No sleep data found",
      };
    }

    const sleepEntry = sleepData.record.find((entry) =>
      entry._id.equals(sleepObjectId)
    );
    if (!sleepEntry) {
      return {
        success: false,
        message: "Sleep entry not found",
      };
    }
    return {
      success: true,
      message: "Sleep data fetched successfully",
      data: sleepEntry,
    };
  } catch (error) {
    return {
      success: false,
      message: "Internal server error",
      error,
    };
  }
};
