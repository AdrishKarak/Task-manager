const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { exportTasksReport, exportusersReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks" , protect , adminOnly , exportTasksReport); //Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportusersReport); //Export user-task report

module.exports = router;