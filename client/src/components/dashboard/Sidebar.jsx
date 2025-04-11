import {useNavigate, NavLink} from "react-router-dom";
import {AlertTriangle, FileText, PlusCircle, LogOut} from "lucide-react";
import Logo from "../../assets/Logo.png";

const Sidebar = ({isSidebarOpen}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/", {replace: true});
    };
    const activeLinkClass = "bg-red-700 text-white";
    const normalLinkClass = "text-gray-300 hover:bg-gray-800 hover:text-white";

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col shadow-xl transition-transform duration-300 
                ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
                md:translate-x-0 md:w-64 z-50`}
        >
            <div className="p-5 border-b border-gray-800">
                <div className="flex items-center justify-center mb-2">
                    <img src={Logo} alt="SwiftSage Logo" className="w-10 h-10"/>
                    <h1 className="text-xl font-bold ml-3 text-white">SwiftSage</h1>
                </div>
                <p className="text-xs text-gray-400 text-center">Crisis Management System</p>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-3">
                <div className="mt-8">
                    <p className="text-gray-500 text-xs font-semibold uppercase px-2 mb-2">Actions</p>
                    <button
                        onClick={() => navigate("/dashboard/add-report")}
                        className="w-full flex items-center px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors mb-1"
                    >
                        <PlusCircle size={18} className="mr-3"/>
                        Add New Report
                    </button>
                </div>
                <p className="text-gray-500 text-xs font-semibold uppercase px-2 mb-2">Main Menu</p>
                <NavLink
                    to="/dashboard/alerts"
                    className={({isActive}) =>
                        `flex items-center px-4 py-3 rounded-lg mb-1 transition-colors ${isActive ? activeLinkClass : normalLinkClass}`
                    }
                >
                    <AlertTriangle size={18} className="mr-3"/>
                    Alerts
                </NavLink>
                <NavLink
                    to="/dashboard/my-reports"
                    className={({isActive}) =>
                        `flex items-center px-4 py-3 rounded-lg mb-1 transition-colors ${isActive ? activeLinkClass : normalLinkClass}`
                    }
                >
                    <FileText size={18} className="mr-3"/>
                    My Reports
                </NavLink>
            </div>
            <div className="p-4 border-t border-gray-800">
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors mt-2"
                    >
                        <LogOut size={16} className="mr-3"/>
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;