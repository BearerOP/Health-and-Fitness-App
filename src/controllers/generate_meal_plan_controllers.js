const {generateMealPlan} = require("../services/generate_meal_plan_service")

exports.generateMealPlan = async (req, res) => {
    try {
      const data = await generateMealPlan(req, res);
    //   if (data.success) {
    //     res.status(200).json(data);
    //   }else{
    //       res.status(403).json(data);
    //   }
    } catch (error) {
      console.log("Error:", error);
    }
  };