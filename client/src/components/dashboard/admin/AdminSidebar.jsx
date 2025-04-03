import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.png";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/", { replace: true });
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5 fixed">
            <div className="mb-10 text-center">
                <img src={Logo} alt="Logo" className="w-12 h-12 mx-auto" />
                <h1 className="text-2xl font-bold">Admin Panel</h1>
            </div>
            <button className="mb-3 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700"
                    onClick={() => navigate("/admin/reports")}>
                📊 Reports Overview
            </button>
            <button className="mb-3 px-4 py-2 bg-yellow-600 rounded-md hover:bg-yellow-700"
                    onClick={() => navigate("/admin/alerts")}>
                ⚠️ Manage Alerts
            </button>
            <button className="mb-3 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => navigate("/admin/map")}>
                🗺️ Crisis Map
            </button>
            <div className="mt-auto">
                <button className="w-full px-4 py-2 bg-red-500 rounded-md hover:bg-red-700"
                        onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        </div>
    );
};
export default AdminSidebar;