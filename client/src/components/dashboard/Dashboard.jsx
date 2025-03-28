
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsSidebarOpen(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex h-screen w-full">
            {isSidebarOpen && <Sidebar />}

            {isMobile && !isSidebarOpen && (
                <button
                    className="absolute top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <Menu size={24} />
                </button>
            )}

            <div className="ml-64 p-6 flex-1 min-h-screen bg-gray-100 transition-all">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
