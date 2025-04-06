import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Sidebar = ({ isSidebarOpen }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/", { replace: true });
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-gray-900 text-white flex flex-col p-5 transition-transform duration-300 
                ${isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full w-0"}
                md:translate-x-0 md:w-64`}
        >
            {/* Logo */}
            <div className="mb-10 text-center">
                <img src={Logo} alt="Logo" className="w-12 h-12 mx-auto" />
                <h1 className="text-2xl font-bold">SwiftSage</h1>
            </div>


            <button className="mb-3 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700" onClick={() => navigate("/dashboard/add-report")}>
                ➕ Add a New Report
            </button>

            <button className="mb-3 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600" onClick={() => navigate("/dashboard/my-reports")}>
                📄 My Reports
            </button>

            <button className="mb-3 px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600" onClick={() => navigate("/dashboard/alerts")}>
                ⚠ Alerts
            </button>


            <div className="mt-auto">
                <button className="w-full px-4 py-2 bg-red-500 rounded-md hover:bg-red-700" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
