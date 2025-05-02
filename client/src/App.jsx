import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {useState, useEffect} from "react";
import LandingPage from "./components/landingpage/LandingPage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import AdminReports from "./components/dashboard/admin/ReportsOverview.jsx";
import AdminMap from "./components/dashboard/admin/MapView.jsx";
import AdminAlerts from "./components/dashboard/admin/AdminAlerts.jsx";
import AdminSidebar from "./components/dashboard/admin/AdminSidebar.jsx";
import AdminStatics from "./components/dashboard/admin/AdminStatics.jsx";
import AdminUsers from "./components/dashboard/admin/AdminUsers.jsx";

const App = () => {
    const [authChecked, setAuthChecked] = useState(false);  // State to track if auth has been checked
    const [userRole, setUserRole] = useState(null); // State to store the user role

    // Check localStorage for token and role on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("userRole");
        if (token && role) {
            setUserRole(role);
        }
        setAuthChecked(true); // once check is done, then we set authChecked to true
    }, []);

    if (!authChecked) {
        return <div>Loading...</div>; // show loading state while checking auth
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<SignupForm/>}/>
                <Route
                    path="/dashboard/*"
                    element={<Dashboard />}
                />

                <Route
                    path="/admin/*"
                    element={
                        ( // TEMPORARY ACCESS
                            <div className="flex h-screen w-full">
                                <AdminSidebar/>
                                <div className="flex-1 p-6 bg-gray-100 ml-64">
                                    <Routes>
                                        <Route path="reports" element={<AdminReports/>}/>
                                        <Route path="map" element={<AdminMap/>}/>
                                        <Route path="alerts" element={<AdminAlerts/>}/>
                                        <Route path="statistics" element={<AdminStatics/>}/>
                                        <Route path="users" element={<AdminUsers/>}/>
                                    </Routes>
                                </div>
                            </div>
                        )
                    }
                />

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    );
};
export default App;
