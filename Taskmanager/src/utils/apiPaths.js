export const BASE_URL = "https://tms-backend-k0p5.onrender.com";

export const API_PATHS = {

    AUTH: {
        REGISTER: "/api/auth/register",          // Register a new user (Admin or Member)
        LOGIN: "/api/auth/login",                // Login user
        GET_PROFILE: "/api/auth/profile",        // Get logged-in user details
    },

    USERS: {
        GET_ALL_USERS: "/api/users",                         // Get all users (Admin only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`,  // Get a user by ID
        CREATE_USER: "/api/users",                           // Create a new user (Admin only)
        UPDATE_USER: (userId) => `/api/users/${userId}`,     // Update user details
        DELETE_USER: (userId) => `/api/users/${userId}`,     // Delete user
    },

    TASKS: {

        // Dashboard
        GET_DASHBOARD_DATA: "/api/tasks/dashboard-data",                     // Get Dashboard Data
        GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data",           // Get User Dashboard Data
        // Tasks
        GET_ALL_TASKS: "/api/tasks",                                    // Get all tasks (Admin only)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`,             // Get task details by ID
        CREATE_TASK: "/api/tasks",                                      // Create a new task
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`,                // Update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`,                // Delete task (Admin only)

        // Status
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`,  // Update task status

        // Checklist / Todo
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, // Update todo checklist
    },

    REPORTS: {
        EXPORT_TASKS: "/api/reports/export/tasks",  // Download all tasks as an Excel/PDF
        EXPORT_USERS: "/api/reports/export/users",  // Download all users as an Excel/PDF
    },

    IMAGE: {
        UPLOAD_IMAGE: "api/auth/upload-image"
    }

};
