import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen w-full bg-gray-50">
            <AdminSidebar />
            <div className="ml-64 p-6 flex-1 min-h-screen bg-gray-100 overflow-auto">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;