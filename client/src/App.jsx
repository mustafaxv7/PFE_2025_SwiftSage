import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/landingpage/LandingPage.jsx";
import LoginForm from "./components/auth/LoginForm.jsx";
import SignupForm from "./components/auth/SignupForm.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import MyReports from "./components/dashboard/MyReports.jsx";
import AddReport from "./components/dashboard/AddReport.jsx";
import Sidebar from "./components/dashboard/Sidebar.jsx";
import Alerts from "./components/dashboard/Alerts.jsx";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";
import AdminReports from "./components/dashboard/admin/ReportsOverview.jsx";
import AdminMap from "./components/dashboard/admin/MapView.jsx";
import AdminAlerts from "./components/dashboard/admin/AdminAlerts.jsx";
import AdminSidebar from "./components/dashboard/admin/AdminSidebar.jsx";

const App = () => {
    const userRole = localStorage.getItem("userRole");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                {userRole === "user" && (
                    <Route
                        path="/dashboard/*"
                        element={
                            <div className="flex h-screen w-full">
                                <Sidebar />
                                <div className="flex-1 p-6 bg-gray-100 ml-64">
                                    <Routes>
                                        <Route path="dashboard" element={<Dashboard />} />
                                        <Route path="my-reports" element={<MyReports />} />
                                        <Route path="add-report" element={<AddReport />} />
                                        <Route path ="alerts" element={<Alerts />} />
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                )}
                {userRole === "admin" && (
                    <Route
                        path="/admin/*"
                        element={
                            <div className="flex h-screen w-full">
                                <AdminSidebar />
                                <div className="flex-1 p-6 bg-gray-100 ml-64">
                                    <Routes>
                                        <Route path="dashboard" element={<AdminDashboard />} />
                                        <Route path="reports" element={<AdminReports />} />
                                        <Route path="map" element={<AdminMap />} />
                                        <Route path="alerts" element={<AdminAlerts />} />
                                    </Routes>
                                </div>
                            </div>
                        }
                    />
                )}
                <Route
                    path="/redirect"
                    element={
                        userRole === "admin" ? <Navigate to="/admin/dashboard" replace /> :
                            userRole === "user" ? <Navigate to="/dashboard/my-reports" replace /> :
                                <Navigate to="/login" replace />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};
export default App;
