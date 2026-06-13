import {BrowserRouter as Router, Routes, Route, Navigate, Link} from "react-router-dom";
import {useState, useEffect, lazy, Suspense} from "react";
import { fetchWithAuth } from "./utils/api.js";

const LandingPage = lazy(() => import("./components/landingpage/LandingPage.jsx"));
const LoginForm = lazy(() => import("./components/auth/LoginForm.jsx"));
const SignupForm = lazy(() => import("./components/auth/SignupForm.jsx"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard.jsx"));
const AdminReports = lazy(() => import("./components/dashboard/admin/ReportsOverview.jsx"));
const AdminMap = lazy(() => import("./components/dashboard/admin/MapView.jsx"));
const AdminAlerts = lazy(() => import("./components/dashboard/admin/AdminAlerts.jsx"));
const AdminSidebar = lazy(() => import("./components/dashboard/admin/AdminSidebar.jsx"));
const AdminStatics = lazy(() => import("./components/dashboard/admin/AdminStatics.jsx"));
const AdminUsers = lazy(() => import("./components/dashboard/admin/AdminUsers.jsx"));

const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-500">Loading...</p>
        </div>
    </div>
);

const App = () => {
    const [authChecked, setAuthChecked] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await fetchWithAuth("/auth/me");
                setUserRole(data?.role || null);
            } catch {
                setUserRole(null);
            } finally {
                setAuthChecked(true);
            }
        };
        checkAuth();
    }, []);

    if (!authChecked) {
        return <LoadingSpinner />;
    }

    return (
        <Router>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/signup" element={<SignupForm/>}/>
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    <Route
                        path="/admin/*"
                        element={
                            userRole === "admin" ? (
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
                            ) : (
                                <Navigate to="/" replace />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace/>}/>
                </Routes>
            </Suspense>
        </Router>
    );
};
export default App;
