import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Dashboard from "./pages/User/Dashboard.jsx";
import DashboardAdmin from "./pages/Admin/DashboardAdmin.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ManageTasks from "./pages/Admin/ManageTasks.jsx";
import CreateTask from "./pages/Admin/CreateTask.jsx";
import ManageUsers from "./pages/Admin/ManageUsers.jsx";
import MyTasks from "./pages/User/MyTasks.jsx";
import ViewTasksdetails from "./pages/User/ViewTasksdetails.jsx";
import UserProvider, { UserContext } from './context/userContext.jsx';
import { useContext } from 'react';
import Snowfall from 'react-snowfall';

const App = () => {
    return (
        <UserProvider>
            <div>
                <Snowfall color="rgba(239,68,68,0.75)" />
                <Router>
                    <Routes>
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<Signup />} />

                        {/*Admin Routes */}
                        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                            <Route path='/admin/dashboard' element={<DashboardAdmin />} />
                            <Route path='/admin/tasks' element={<ManageTasks />} />
                            <Route path='/admin/create-tasks' element={<CreateTask />} />
                            <Route path='/admin/users' element={<ManageUsers />} />
                        </Route>

                        {/*User Routes */}
                        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
                            <Route path='/user/dashboard' element={<Dashboard />} />
                            <Route path='/user/my-tasks' element={<MyTasks />} />
                            <Route path='/user/task-details' element={<ViewTasksdetails
                            />} />
                        </Route>
                        {/*Default route*/}
                        <Route path='/' element={<Root />} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
};

export default App;

const Root = () => {

    const { user, loading } = useContext(UserContext);

    if (loading) return <Outlet />

    if (!user) {
        return <Navigate to="/login" />
    }

    return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />
}