const express = require("express");
const reminder_router = express.Router();

const user_auth = require("../../middleware/user_auth.js");

const {
    create_medication,
    delete_medication,
    update_medication,
    get_medication,
    
} = require("../controllers/medication_controller.js");

reminder_router.post("/create_medication", user_auth, create_medication);

reminder_router.post("/delete_medication", user_auth, delete_medication);

reminder_router.post("/update_medication", user_auth, update_medication);

reminder_router.get("/get_medication", user_auth, get_medication);



module.exports = reminder_router;