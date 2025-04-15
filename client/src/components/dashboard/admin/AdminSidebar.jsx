import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/Logo.png";
import {
    BarChart2,
    AlertTriangle,
    Map,
    LineChart,
    LogOut,
    Users,
} from "lucide-react";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/", { replace: true });
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        { path: "/admin/reports", icon: <BarChart2 size={18} />, text: "Reports Overview", bgColor: "bg-red-600", hoverColor: "hover:bg-red-700" },
        { path: "/admin/alerts", icon: <AlertTriangle size={18} />, text: "Manage Alerts", bgColor: "bg-yellow-600", hoverColor: "hover:bg-yellow-700" },
        { path: "/admin/map", icon: <Map size={18} />, text: "Crisis Map", bgColor: "bg-blue-600", hoverColor: "hover:bg-blue-700" },
        { path: "/admin/statistics", icon: <LineChart size={18} />, text: "Statistics", bgColor: "bg-green-600", hoverColor: "hover:bg-green-700" },
        {
            path: "/admin/users",
            icon: <Users size={18} />,
            text: "Manage Users",
            bgColor: "bg-purple-600",
            hoverColor: "hover:bg-purple-700"
        }
    ];

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5 fixed left-0 top-0 shadow-lg">
            <div className="mb-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className="text-2xl font-bold">Crisis Command</h1>
                <div className="mt-1 text-xs text-gray-400">Admin Control Panel</div>
            </div>

            <nav className="flex-1">
                <div className="mb-4 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                    Main Navigation
                </div>

                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        className={`mb-2 px-4 py-3 rounded-md w-full flex items-center text-left transition-all ${
                            isActive(item.path)
                                ? `${item.bgColor} text-white`
                                : 'bg-transparent text-gray-300 hover:bg-gray-800'
                        }`}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className="font-medium">{item.text}</span>
                    </button>
                ))}
            </nav>

            <div className="border-t border-gray-700 pt-4 mt-4">
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <div className="w-8 h-8 bg-gray-700 rounded-full mr-2"></div>
                        <div>
                            <div className="text-sm font-medium">Admin User</div>
                            <div className="text-xs text-gray-400">admin@example.com</div>
                        </div>
                    </div>
                </div>

                <button
                    className="w-full px-4 py-2 bg-red-500 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                    onClick={handleLogout}
                >
                    <LogOut size={16} className="mr-2" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;