const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@desc Get all users (admin only )
//@route GET /api/users
//@access Private(admin)

const getUsers = async (req, res) => {
    try {
   
       const userWithTaskCounts = await Promise.all(users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "Pending" });
        const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: "In Progress" });
        const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "Completed" });

        return {
            ...user._doc,    //Include all existing user data
            pendingTasks,
            inProgressTasks,
            completedTasks,
        };
       }));

       res.json(userWithTaskCounts);

    } catch (error) {
        res.status(500).json({message: "Internal server error" , error: error.message});;
    }
};

//@dsec Get user by Id
//@route GET /api/users/:id
//access Private

const getUserById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Internal server error" , error: error.message});;
    }
};


//@dsec Delete a user (admin only)
//@route DELETE /api/users/:id
//access Private(admin) only

const deleteUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Internal server error" , error: error.message});;
    }
};


module.exports = {getUsers, getUserById, deleteUser};




