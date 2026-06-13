import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, X, Filter, History, ExternalLink, Eye, Loader } from 'lucide-react';
import { fetchWithAuth } from '../../utils/api.js';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showDetails, setShowDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                setLoading(true);
                const data = await fetchWithAuth('/api/alerts');
                if (data && data.length > 0) {
                    const formatted = data.map((alert) => ({
                        ...alert,
                        status:
                            typeof alert.status === 'string'
                                ? alert.status.charAt(0).toUpperCase() + alert.status.slice(1)
                                : 'Active',
                        importance: alert.importance
                            ? alert.importance.charAt(0).toUpperCase() + alert.importance.slice(1)
                            : 'Medium',
                    }));
                    setAlerts(formatted);
                }
            } catch (error) {
                console.error('Error loading alerts:', error);
            } finally {
                setLoading(false);
            }
        };
        loadAlerts();
    }, []);

    const dismissAlert = (id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    const getAlertIcon = (type) => {
        switch (type) {
            case 'info':
                return (
                    <span className="text-blue-500">
                        <Bell size={20} />
                    </span>
                );
            case 'danger':
                return (
                    <span className="text-red-500">
                        <AlertTriangle size={20} />
                    </span>
                );
            case 'warning':
                return (
                    <span className="text-orange-500">
                        <AlertTriangle size={20} />
                    </span>
                );
            default:
                return (
                    <span className="text-gray-500">
                        <Bell size={20} />
                    </span>
                );
        }
    };

    const getAlertClass = (type) => {
        switch (type) {
            case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
            case 'danger':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
        }
    };

    const filteredAlerts =
        filter === 'all'
            ? alerts.filter((alert) => alert.status === 'Active')
            : alerts.filter((alert) => alert.status === 'Active' && alert.type === filter);

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                        <Bell className="mr-2 text-red-500" size={24} />
                        Alert Center
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                        <div className="flex items-center gap-1 mb-2 sm:mb-0">
                            <span className="text-sm text-gray-500">Filter:</span>
                            <Filter size={16} className="text-gray-400" />
                        </div>
                        <div className="flex flex-wrap gap-1 w-full sm:w-auto">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === 'all' ? 'bg-gray-200 text-gray-800 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilter('info')}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === 'info' ? 'bg-blue-200 text-blue-800 font-medium' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                            >
                                Information
                            </button>
                            <button
                                onClick={() => setFilter('warning')}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === 'warning' ? 'bg-yellow-200 text-yellow-800 font-medium' : 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'}`}
                            >
                                Warning
                            </button>
                            <button
                                onClick={() => setFilter('danger')}
                                className={`px-3 py-1 text-sm rounded-md transition ${filter === 'danger' ? 'bg-red-200 text-red-800 font-medium' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}
                            >
                                Critical
                            </button>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600 mt-1">Stay informed about ongoing Crisis situations</p>
            </div>

            <div className="p-6">
                {loading ? (
                    <div className="text-center py-12">
                        <Loader className="mx-auto text-blue-500 animate-spin" size={40} />
                        <p className="mt-4 text-gray-500">Loading alerts...</p>
                    </div>
                ) : filteredAlerts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <Bell size={40} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">No active alerts at the moment</p>
                        <p className="text-sm text-gray-400 mt-1">
                            All clear for now. Check again later.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`border rounded-lg overflow-hidden shadow-sm transition ${getAlertClass(alert.type)}`}
                            >
                                <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-start justify-between gap-2">
                                    <div className="flex items-start w-full">
                                        <div className="mr-3 mt-1">{getAlertIcon(alert.type)}</div>
                                        <div className="flex-1">
                                            <div className="font-medium">{alert.message}</div>
                                            <div className="text-sm opacity-80 mt-1 flex flex-wrap items-center gap-2">
                                                <span>{alert.date}</span>
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {alert.importance} Priority
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-0 ml-auto sm:ml-0">
                                        <button
                                            onClick={() =>
                                                setShowDetails(
                                                    showDetails === alert.id ? null : alert.id
                                                )
                                            }
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
                                    <div className="p-3 sm:p-4 border-t border-gray-200 bg-white/50">
                                        <p className="text-sm mb-3">{alert.description}</p>
                                        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs text-gray-600">
                                            <div>
                                                <span className="font-medium">Location:</span>{' '}
                                                {alert.location}
                                            </div>
                                            <div>
                                                <span className="font-medium">Affected Area:</span>{' '}
                                                {alert.affectedArea}
                                            </div>
                                        </div>
                                        <div className="mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                            <button className="flex items-center text-xs text-gray-600 hover:text-gray-800">
                                                <History size={14} className="mr-1" />
                                                Recent History
                                            </button>
                                            <button className="flex items-center text-xs text-blue-600 hover:text-blue-800">
                                                <ExternalLink size={14} className="mr-1" />
                                                View full report
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;
