
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import MyReports from "./MyReports";
import AddReport from "./AddReport";
import Alerts from "./Alerts";

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
        <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
            
            <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`
                flex-1 min-h-screen bg-gray-100 transition-all duration-300 p-3 sm:p-4 md:p-6
                ${isSidebarOpen && !isMobile ? 'md:ml-64' : 'ml-0'}
                ${isMobile ? 'pt-16' : ''}
                overflow-y-auto
            `}>
                <div className="max-w-7xl mx-auto w-full">
                    <Routes>
                        <Route index element={<div className="p-4">Dashboard Home</div>} />
                        <Route path="my-reports" element={<MyReports />} />
                        <Route path="add-report" element={<AddReport />} />
                        <Route path="alerts" element={<Alerts />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};


export default Dashboard;
