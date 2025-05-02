import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col sm:flex-row h-screen w-full bg-gray-50 overflow-hidden">
            <AdminSidebar isMobile={isMobile} />
            <div className={`${isMobile ? 'ml-0 w-full' : 'ml-64'} p-3 sm:p-6 flex-1 min-h-screen bg-gray-100 overflow-auto transition-all duration-300`}>
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;