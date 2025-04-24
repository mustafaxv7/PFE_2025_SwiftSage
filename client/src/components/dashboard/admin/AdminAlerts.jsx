import {useState} from "react";
import {Bell, AlertTriangle, Trash2, Send, Shield} from "lucide-react";

const AdminAlerts = () => {
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("info");
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            message: "Inondation à Alger",
            date: "10 Mars, 2025",
            time: "08:30",
            status: "Active",
            importance: "High",
            type: "info"
        },
        {
            id: 2,
            message: "Séisme à Béjaïa",
            date: "15 Mars, 2025",
            time: "14:22",
            status: "Resolved",
            importance: "Critical",
            type: "danger"
        },
        {
            id: 3,
            message: "Incendie de forêt à Tizi Ouzou",
            date: "2 Avril, 2025",
            time: "11:15",
            status: "Active",
            importance: "High",
            type: "warning"
        }
    ]);

    const sendAlert = () => {
        if (!message.trim()) return;

        const now = new Date();
        
        const newAlert = {
            id: Date.now(),
            message: message,
            date: now.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            time: now.toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }),
            status: "Active",
            importance: alertType === "danger" ? "Critical" : "High",
            type: alertType
        };

        setAlerts([newAlert, ...alerts]);
        setMessage("");
    };

    const deleteAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const toggleStatus = (id) => {
        setAlerts(alerts.map(alert =>
            alert.id === id
                ? {...alert, status: alert.status === "Active" ? "Resolved" : "Active"}
                : alert
        ));
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case "info":
                return <span className="text-blue-500"><Bell size={20}/></span>;
            case "danger":
                return <span className="text-red-500"><AlertTriangle size={20}/></span>;
            case "warning":
                return <span className="text-orange-500"><Shield size={20}/></span>;
            default:
                return <span className="text-gray-500"><Bell size={20}/></span>;
        }
    };

    const getStatusBadge = (status) => {
        return status === "Active"
            ? <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">Active</span>
            : <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-800 font-medium">Resolved</span>;
    };

    const getImportanceBadge = (importance) => {
        return importance === "Critical"
            ? <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-800 font-medium">Critical</span>
            : <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 font-medium">High</span>;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Emergency Alerts Management</h2>
                <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                    {alerts.filter(a => a.status === "Active").length} Active Alerts
                </span>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Create New Alert</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Message</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Write an alert message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                    ></textarea>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('info')}
                            >
                                <Bell size={14} className="mr-1"/>
                                Information
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('warning')}
                            >
                                <Shield size={14} className="mr-1"/>
                                Warning
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'danger' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('danger')}
                            >
                                <AlertTriangle size={14} className="mr-1"/>
                                Critical
                            </button>
                        </div>
                    </div>

                    <button
                        className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                        onClick={sendAlert}
                    >
                        <Send size={16} className="mr-2"/>
                        Send Alert
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Active Alerts</h3>
                <div className="flex space-x-2">
                    <select
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option>All Types</option>
                        <option>Information</option>
                        <option>Warning</option>
                        <option>Critical</option>
                    </select>
                    <select
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Resolved</option>
                    </select>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {alerts.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="px-4 py-6 text-sm text-gray-500 text-center">No alerts found</td>
                        </tr>
                    ) : (
                        alerts.map((alert) => (
                            <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-4 whitespace-nowrap">{getAlertIcon(alert.type)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.message}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div>{alert.date}</div>
                                    <div className="text-xs">{alert.time}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">{getStatusBadge(alert.status)}</td>
                                <td className="px-4 py-4 whitespace-nowrap">{getImportanceBadge(alert.importance)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => toggleStatus(alert.id)}
                                            className={`text-sm px-3 py-1 rounded ${alert.status === "Active" ? "text-green-600 hover:bg-green-50" : "text-blue-600 hover:bg-blue-50"}`}
                                        >
                                            {alert.status === "Active" ? "Resolve" : "Reactivate"}
                                        </button>
                                        <button
                                            onClick={() => deleteAlert(alert.id)}
                                            className="text-red-600 hover:text-red-800 hover:bg-red-50 rounded p-1"
                                        >
                                            <Trash2 size={16}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAlerts;