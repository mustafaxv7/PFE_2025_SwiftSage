import React, { useState, useEffect } from "react";
import { Bell, AlertTriangle, X, Filter, History, ExternalLink, Eye } from "lucide-react";

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showDetails, setShowDetails] = useState(null);

    useEffect(() => {
        const receivedAlerts = [
            {
                id: 1,
                message: "Inondation à Alger",
                description: "Niveaux d'eau élevés signalés dans les zones résidentielles. Plusieurs rues sont inaccessibles à Bab El Oued.",
                date: "10 Mars, 2025",
                status: "Active",
                importance: "High",
                type: "info",
                location: "Alger, Algérie",
                affectedArea: "12 km²"
            },
            {
                id: 2,
                message: "Séisme à Béjaïa",
                description: "Séisme de magnitude 5.8 avec des dommages structurels importants et des répliques potentielles attendues.",
                date: "15 Mars, 2025",
                status: "Resolved",
                importance: "Critical",
                type: "danger",
                location: "Béjaïa, Algérie",
                affectedArea: "35 km²"
            },
            {
                id: 3,
                message: "Incendie de forêt à Tizi Ouzou",
                description: "Feu de forêt se propageant rapidement menaçant les zones résidentielles. Ordres d'évacuation en place.",
                date: "2 Avril, 2025",
                status: "Active",
                importance: "High",
                type: "warning",
                location: "Tizi Ouzou, Algérie",
                affectedArea: "1240 hectares"
            }
        ];

        setAlerts(receivedAlerts);
    }, []);

    const dismissAlert = (id) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case "info":
                return <span className="text-blue-500"><Bell size={20} /></span>;
            case "danger":
                return <span className="text-red-500"><AlertTriangle size={20} /></span>;
            case "warning":
                return <span className="text-orange-500"><AlertTriangle size={20} /></span>;
            default:
                return <span className="text-gray-500"><Bell size={20} /></span>;
        }
    };

    const getAlertClass = (type) => {
        switch (type) {
            case "info":
                return "bg-blue-50 border-blue-200 text-blue-800";
            case "danger":
                return "bg-red-50 border-red-200 text-red-800";
            case "warning":
                return "bg-yellow-50 border-yellow-200 text-yellow-800";
            default:
                return "bg-gray-50 border-gray-200 text-gray-800";
        }
    };

    const filteredAlerts = filter === "all"
        ? alerts.filter(alert => alert.status === "Active")
        : alerts.filter(alert => alert.status === "Active" && alert.type === filter);

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                        <Bell className="mr-2 text-red-500" size={24} />
                        Alert Center
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Filter:</span>
                        <Filter size={16} className="text-gray-400" />
                        <div className="flex space-x-1">
                            <button
                                onClick={() => setFilter("all")}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === "all" ? "bg-gray-200 text-gray-800 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter("info")}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === "info" ? "bg-blue-200 text-blue-800 font-medium" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}
                            >
                                Information
                            </button>
                            <button
                                onClick={() => setFilter("warning")}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === "warning" ? "bg-yellow-200 text-yellow-800 font-medium" : "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"}`}
                            >
                                Warning
                            </button>
                            <button
                                onClick={() => setFilter("danger")}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === "danger" ? "bg-red-200 text-red-800 font-medium" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
                            >
                                Critical
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 mt-1">Stay informed about ongoing Crisis situations</p>
            </div>

            <div className="p-6">
                {filteredAlerts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Bell size={40} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">No active alerts at the moment</p>
                        <p className="text-sm text-gray-400 mt-1">All clear for now. Check again later.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`border rounded-lg overflow-hidden shadow-sm transition ${getAlertClass(alert.type)}`}
                            >
                                <div className="p-4 flex items-start justify-between">
                                    <div className="flex items-start">
                                        <div className="mr-3 mt-1">{getAlertIcon(alert.type)}</div>
                                        <div>
                                            <div className="font-medium">{alert.message}</div>
                                            <div className="text-sm opacity-80 mt-1 flex items-center gap-2">
                                                {alert.date}
                                                <span
                                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {alert.importance} Priority
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setShowDetails(showDetails === alert.id ? null : alert.id)}
                                            className="p-1 rounded-full hover:bg-white/30 transition"
                                            aria-label="View details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => dismissAlert(alert.id)}
                                            className="p-1 rounded-full hover:bg-white/30 transition"
                                            aria-label="Dismiss alert"
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                </div>

                                {showDetails === alert.id && (
                                    <div className="p-4 border-t border-gray-200 bg-white/50">
                                        <p className="text-sm mb-3">{alert.description}</p>
                                        <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                                            <div>
                                                <span className="font-medium">Location:</span> {alert.location}
                                            </div>
                                            <div>
                                                <span className="font-medium">Affected Area:</span> {alert.affectedArea}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex justify-between items-center">
                                            <button
                                                className="flex items-center text-xs text-gray-600 hover:text-gray-800"
                                            >
                                                <History size={14} className="mr-1" />
                                                Recent History
                                            </button>
                                            <button
                                                className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                <ExternalLink size={14} className="mr-1" />
                                                View full report
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;