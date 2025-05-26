import { useNavigate, NavLink } from "react-router-dom";
import {
  AlertTriangle,
  FileText,
  PlusCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import Logo from "../../assets/Logo.png";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  };

  const navItems = [
    {
      path: "/dashboard/alerts",
      name: "Alerts",
      icon: <AlertTriangle size={18} className="mr-3" />
    },
    {
      path: "/dashboard/my-reports",
      name: "My Reports",
      icon: <FileText size={18} className="mr-3" />
    }
  ];

  return (
    <>
      
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-red-600 text-white md:hidden"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col shadow-xl transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"}
          md:translate-x-0 md:w-64 z-40 overflow-hidden`}
      >
        
        <div className="p-5 border-b border-gray-800 bg-gray-950">
          <div className="flex items-center justify-center mb-2">
            <img src={Logo} alt="SwiftSage Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold ml-3 text-white">SwiftSage</h1>
          </div>
          <p className="text-xs text-gray-400 text-center">Crisis Management System</p>
        </div>

        
        <div className="px-4 py-4">
          <button
            onClick={() => navigate("/dashboard/add-report")}
            className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
          >
            <PlusCircle size={18} className="mr-2" />
            New Crisis Report
          </button>
        </div>

        
        <div className="flex-1 overflow-y-auto py-4 px-3 min-h-0">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors ${isActive
                    ? "bg-red-700 text-white font-medium"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        
        <div className="p-4 border-t border-gray-800 bg-gray-950">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-white">User Name</p>
              <p className="text-xs text-gray-400">Emergency Responder</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut size={16} className="mr-2" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;