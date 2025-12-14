const express = require("express");
const router = express.Router();

const controller = require("../controllers/assessment.controller");

router.post("/submit", controller.submitAssessment);
router.get("/share/:userId", controller.shareProfile);
router.post("/compare", controller.compareProfiles);

module.exports = router;
