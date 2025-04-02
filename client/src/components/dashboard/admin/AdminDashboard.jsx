import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
    return (
        <div className="flex h-screen w-full">
            <AdminSidebar />
            <div className="ml-64 p-6 flex-1 min-h-screen bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};
export default AdminDashboard;