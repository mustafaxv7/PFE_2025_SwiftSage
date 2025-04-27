import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import {
    BarChart2,
    AlertTriangle,
    Map,
    LineChart,
    LogOut,
    Users,
    Menu,
    X
} from "lucide-react";
import { useState, useEffect } from "react";

const AdminSidebar = ({ isMobile = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        // Close mobile sidebar when route changes
        setIsMobileOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/", { replace: true });
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        { 
            path: "/admin/reports", 
            icon: <BarChart2 size={isMobile ? 16 : 18} />, 
            text: "Reports Overview", 
            bgColor: "bg-red-600", 
            hoverColor: "hover:bg-red-700" 
        },
        { 
            path: "/admin/alerts", 
            icon: <AlertTriangle size={isMobile ? 16 : 18} />, 
            text: "Manage Alerts", 
            bgColor: "bg-yellow-600", 
            hoverColor: "hover:bg-yellow-700" 
        },
        { 
            path: "/admin/map", 
            icon: <Map size={isMobile ? 16 : 18} />, 
            text: "Crisis Map", 
            bgColor: "bg-blue-600", 
            hoverColor: "hover:bg-blue-700" 
        },
        { 
            path: "/admin/statistics", 
            icon: <LineChart size={isMobile ? 16 : 18} />, 
            text: "Statistics", 
            bgColor: "bg-green-600", 
            hoverColor: "hover:bg-green-700" 
        },
        {
            path: "/admin/users",
            icon: <Users size={isMobile ? 16 : 18} />,
            text: "Manage Users",
            bgColor: "bg-purple-600",
            hoverColor: "hover:bg-purple-700"
        }
    ];

    // Updated sidebar classes to fix spacing issue
    const sidebarClasses = `
        ${isMobile ? 
            `fixed inset-y-0 left-0 z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out` 
            : 
            'fixed w-64'
        }
        h-screen bg-gray-900 text-white flex flex-col shadow-xl
    `;

    return (
        <>
            
            {isMobile && (
                <button 
                    className="fixed top-3 sm:top-4 left-3 sm:left-4 z-50 p-1.5 sm:p-2 rounded-md bg-red-600 text-white md:hidden"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X size={isMobile ? 18 : 20} /> : <Menu size={isMobile ? 18 : 20} />}
                </button>
            )}

            <div className={sidebarClasses}>
                {/* Logo and branding */}
                <div className="p-4 sm:p-5 flex flex-col items-center border-b border-gray-800">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2">
                        <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold">Crisis Command</h1>
                    <div className="mt-1 text-xs text-gray-400">Admin Control Panel</div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-5">
                    <div className="mb-3 sm:mb-4 text-xs uppercase text-gray-500 font-semibold tracking-wider px-2">
                        Main Navigation
                    </div>

                    <div className="space-y-1 sm:space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.path}
                                className={`
                                    px-3 sm:px-4 py-2 sm:py-3 rounded-md w-full flex items-center text-left transition-all text-sm sm:text-base
                                    ${isActive(item.path)
                                        ? `${item.bgColor} text-white shadow-md`
                                        : 'bg-transparent text-gray-300 hover:bg-gray-800'
                                    }
                                `}
                                onClick={() => navigate(item.path)}
                            >
                                <span className="mr-2 sm:mr-3">{item.icon}</span>
                                <span className="font-medium">{item.text}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                {/* User profile and logout */}
                <div className="border-t border-gray-800 p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4">
                        <div className="flex items-center mb-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded-full mr-2 flex items-center justify-center text-xs sm:text-sm font-bold">
                                A
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm font-medium">Admin User</div>
                                <div className="text-xs text-gray-400">admin@example.com</div>
                            </div>
                        </div>
                    </div>

                    <button
                        className="w-full px-3 sm:px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center text-sm sm:text-base"
                        onClick={handleLogout}
                    >
                        <LogOut size={isMobile ? 14 : 16} className="mr-2" />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;