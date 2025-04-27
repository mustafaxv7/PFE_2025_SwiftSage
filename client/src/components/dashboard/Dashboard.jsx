
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
        };

        // Initial check
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            {/* Mobile sidebar with overlay */}
            {isMobile && isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>
            )}

            {/* Sidebar with conditional classes for mobile/desktop */}
            <div className={`
                ${isMobile ? 'fixed z-50' : 'relative'} 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                transition-transform duration-300 ease-in-out
            `}>
                <Sidebar isMobile={isMobile} closeSidebar={() => setIsSidebarOpen(false)} />
            </div>

            {/* Toggle button for mobile */}
            <button
                className={`fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden transition-all ${isSidebarOpen ? 'translate-x-64' : 'translate-x-0'}`}
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Main content area with responsive margin */}
            <div className={`
                flex-1 min-h-screen bg-gray-100 transition-all p-4 sm:p-6
                ${isSidebarOpen && !isMobile ? 'ml-64' : 'ml-0'}
                ${isMobile ? 'pt-16' : ''}
            `}>
                <Outlet />
            </div>
        </div>
    );
};


export default Dashboard;
