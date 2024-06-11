const express = require("express");
const router = express.Router();

const user_auth = require("../../middleware/user_auth.js");

const {
    generateMealPlan
} = require("../controllers/generate_meal_plan_controllers.js");

router.get("/generateMealPlan",  generateMealPlan);

module.exports = router;