import { useState, useEffect } from "react";
import { Bell, AlertTriangle, Trash2, Send, Shield, MapPin } from "lucide-react";

const AdminAlerts = () => {
    const [message, setMessage] = useState("");
    const [alertType, setAlertType] = useState("info");
    const [selectedWilaya, setSelectedWilaya] = useState("Chlef");
    const [filterType, setFilterType] = useState("All Types");
    const [filterStatus, setFilterStatus] = useState("All Status");
    const [filterLocation, setFilterLocation] = useState("All Locations");
    // List of communes of Chlef
    const chelfCommunes = [
        "Chlef", "Sendjas", "Oum Drou", "Oued Fodda", "Beni Rached", "Ouled Abbes", "El Karimia", "Harchoun", "Beni Bouateb", "Zeboudja",
        "Bénairia", "Bouzeghaia", "Ouled Fares", "Chettia", "Labiod Medjadja", "Boukadir", "Oued Sly", "Sobha", "Ouled Ben Abdelkader", "El Hadjadj",
        "Aïn Merane", "Herenfa", "Taougrite", "Dahra", "Ténès", "Sidi Akkacha", "Sidi Abderrahmane", "Abou El Hassan", "Talassa", "Tadjena",
        "El Marsa", "Moussadek", "Beni Haoua", "Breira", "Oued Goussine"
    ];
    // Default sample alerts
    const defaultAlerts = [
        {
            id: 1,
            message: "Inondation à Alger",
            description: "Niveaux d'eau élevés signalés dans les zones résidentielles.",
            date: "10 Mars, 2025",
            time: "08:30",
            status: "Active",
            importance: "High",
            type: "info",
            location: "Alger, Algérie",
            affectedArea: "12 km²"
        },
        {
            id: 2,
            message: "Séisme à Béjaïa",
            description: "Séisme de magnitude 5.8 avec des dommages structurels importants.",
            date: "15 Mars, 2025",
            time: "14:22",
            status: "Resolved",
            importance: "Critical",
            type: "danger",
            location: "Béjaïa, Algérie",
            affectedArea: "35 km²"
        },
        {
            id: 3,
            message: "Incendie de forêt à Tizi Ouzou",
            description: "Feu de forêt se propageant rapidement menaçant les zones résidentielles.",
            date: "2 Avril, 2025",
            time: "11:15",
            status: "Active",
            importance: "High",
            type: "warning",
            location: "Tizi Ouzou, Algérie",
            affectedArea: "1240 hectares"
        }
    ];
    const [alerts, setAlerts] = useState([]);
    // Load alerts from localStorage or use defaults
    useEffect(() => {
        try {
            const storedAlerts = localStorage.getItem('userAlerts');
            if (storedAlerts) {
                const parsedAlerts = JSON.parse(storedAlerts);
                if (parsedAlerts && parsedAlerts.length > 0) {
                    setAlerts(parsedAlerts);
                    return;
                }
            }
            // If no stored alerts, use defaults and initialize localStorage
            setAlerts(defaultAlerts);
            localStorage.setItem('userAlerts', JSON.stringify(defaultAlerts));
        } catch (error) {
            console.error('Error loading alerts from localStorage:', error);
            setAlerts(defaultAlerts);
        }
    }, []);

    const sendAlert = () => {
        if (!message.trim()) return;

        const now = new Date();

        const newAlert = {
            id: Date.now(),
            message: message,
            description: message, // Add description for user alerts view
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
            type: alertType,
            location: selectedWilaya, // Use selected wilaya as location
            affectedArea: selectedWilaya === "Chlef" ? "Toutes les communes" : selectedWilaya // Set affected area based on selection
        };

        const updatedAlerts = [newAlert, ...alerts];
        setAlerts(updatedAlerts);
        // Save to localStorage for user alerts view
        localStorage.setItem('userAlerts', JSON.stringify(updatedAlerts));

        setMessage("");
    };

    const deleteAlert = (id) => {
        const updatedAlerts = alerts.filter(alert => alert.id !== id);
        setAlerts(updatedAlerts);
        // Update localStorage when an alert is deleted
        localStorage.setItem('userAlerts', JSON.stringify(updatedAlerts));
    };

    const toggleStatus = (id) => {
        const updatedAlerts = alerts.map(alert =>
            alert.id === id
                ? { ...alert, status: alert.status === "Active" ? "Resolved" : "Active" }
                : alert
        );
        setAlerts(updatedAlerts);
        // Update localStorage when an alert's status changes
        localStorage.setItem('userAlerts', JSON.stringify(updatedAlerts));
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case "info":
                return <span className="text-blue-500"><Bell size={20} /></span>;
            case "danger":
                return <span className="text-red-500"><AlertTriangle size={20} /></span>;
            case "warning":
                return <span className="text-orange-500"><Shield size={20} /></span>;
            default:
                return <span className="text-gray-500"><Bell size={20} /></span>;
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

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alert Type</label>
                        <div className="flex space-x-2">
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'info' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('info')}
                            >
                                <Bell size={14} className="mr-1" />
                                Information
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('warning')}
                            >
                                <Shield size={14} className="mr-1" />
                                Warning
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md text-sm flex items-center ${alertType === 'danger' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                                onClick={() => setAlertType('danger')}
                            >
                                <AlertTriangle size={14} className="mr-1" />
                                Critical
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Affected Location</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MapPin size={16} className="text-gray-500" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={selectedWilaya}
                                onChange={(e) => setSelectedWilaya(e.target.value)}
                            >
                                <option value="Chlef">Toutes les communes de Chlef</option>
                                {chelfCommunes.map((commune, index) => (
                                    <option key={index} value={commune}>{commune}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium mt-4 sm:mt-0"
                        onClick={sendAlert}
                    >
                        <Send size={16} className="mr-2" />
                        Send Alert
                    </button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Active Alerts</h3>
                <div className="flex flex-wrap gap-2">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option>All Types</option>
                        <option>Information</option>
                        <option>Warning</option>
                        <option>Critical</option>
                    </select>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Resolved</option>
                    </select>
                    <select
                        value={filterLocation}
                        onChange={(e) => setFilterLocation(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:border-blue-500 focus:ring-blue-500">
                        <option>All Locations</option>
                        <option>Toutes les communes</option>
                        {chelfCommunes.map((commune, index) => (
                            <option key={index}>{commune}</option>
                        ))}
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
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {(() => {
                            const filteredAlerts = alerts.filter(alert => {
                                // Filter by type
                                if (filterType !== "All Types") {
                                    if (filterType === "Information" && alert.type !== "info") return false;
                                    if (filterType === "Warning" && alert.type !== "warning") return false;
                                    if (filterType === "Critical" && alert.type !== "danger") return false;
                                }
                                // Filter by status
                                if (filterStatus !== "All Status") {
                                    if (filterStatus === "Active" && alert.status !== "Active") return false;
                                    if (filterStatus === "Resolved" && alert.status !== "Resolved") return false;
                                }
                                // Filter by location
                                if (filterLocation !== "All Locations") {
                                    if (filterLocation === "Toutes les communes" && alert.affectedArea !== "Toutes les communes") return false;
                                    if (filterLocation !== "Toutes les communes" && alert.location !== filterLocation) return false;
                                }
                                return true;
                            });

                            return filteredAlerts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-6 text-sm text-gray-500 text-center">No alerts found</td>
                                </tr>
                            ) : (
                                filteredAlerts.map((alert) => (
                                    <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 whitespace-nowrap">{getAlertIcon(alert.type)}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alert.message}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{alert.date}</div>
                                            <div className="text-xs">{alert.time}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <MapPin size={14} className="text-gray-400 mr-1" />
                                                <span>{alert.location}</span>
                                            </div>
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
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        })()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminAlerts;