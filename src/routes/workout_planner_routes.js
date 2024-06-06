const express = require("express");
const router = express.Router();

const user_auth = require("../../middleware/user_auth.js");

const {
    exercises_all,
    exercises_bodyPart,
    exercises_equipment,
    exercises_target_muscle,
    all_body_parts,
    all_equipments,
    all_target_muscles,
    exercises_name,
    exercises_bodyPart_target,
    exercises_bodyPart_equipment,
    exercises_equipment_target,
    exercises_bodyPart_equipment_target,
} = require("../controllers/workout_planner_controller.js");

router.get("/exercises/all", user_auth, exercises_all);

router.get("/exercises/bodyPart", user_auth, exercises_bodyPart);

router.get("/exercises/equipment", user_auth, exercises_equipment);

router.get("/exercises/target_muscle", user_auth, exercises_target_muscle);

router.get("/all/body_parts", user_auth, all_body_parts);

router.get("/all/equipments", user_auth, all_equipments);

router.get("/all/target_muscles", user_auth, all_target_muscles);

router.get("/exercises/name", user_auth, exercises_name);

router.get("/exercises/bodyPart/target", user_auth, exercises_bodyPart_target);

router.get("/exercises/bodyPart/equipment",user_auth,exercises_bodyPart_equipment);

// router.get("/exercises/bodyPart/equipment/target",user_auth,exercises_bodyPart_equipment_target);

// router.get("/exercises/equipment/target",user_auth,exercises_equipment_target);


module.exports = router;
