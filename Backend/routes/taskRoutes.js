const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router = express.Router();

//Task management routes

router.get("/dashboard-data" , protect , getDashboardData);
router.get("/user-dashboard-data" , protect , getUserDashboardData);
router.get("/" , protect, getTasks);  // Get all tasks (admin : all , user: assigned)
router.get("/:id" , protect, getTaskById);  // Get task by id
router.post("/" , protect , adminOnly , createTask);  // Create a new task (admin only)
router.put("/:id" , protect , updateTask);  // Update a task 
router.delete("/:id" , protect , adminOnly , deleteTask);  // Delete a task (admin only)
router.put("/:id/status" , protect , updateTaskStatus);  // Update task status 
router.put("/:id/todo" , protect , updateTaskChecklist);  // Update task checklist

module.exports = router;