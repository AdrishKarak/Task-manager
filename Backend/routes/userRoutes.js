const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getUsers, getUserById, deleteUser } = require("../controllers/userController");
const router = express.Router();

//USER management routes 

router.get("/" , protect , adminOnly , getUsers); // get all adminonly users
router.get("/:id" , protect , getUserById); // get user by id



module.exports = router;