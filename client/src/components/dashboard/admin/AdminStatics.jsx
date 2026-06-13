import { useState, useRef, useEffect } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, CartesianGrid, LineChart, Line
} from "recharts";
import { fetchWithAuth } from "../../../utils/api.js";

const COLORS = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6", "#ec4899",
    "#14b8a6", "#f97316", "#06b6d4", "#84cc16", "#a855f7", "#d946ef", "#0ea5e9"
];

const CRISIS_LABELS = { earthquake: "Earthquake", flood: "Flood", industrial_fire: "Industrial Fire", forest_fire: "Forest Fire" };

const AdminStatics = () => {
    const [view, setView] = useState("daily");
    const [chartType, setChartType] = useState("bar");
    const dashboardRef = useRef();
    const [reports, setReports] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        Promise.all([
            fetchWithAuth("/api/reports").catch(() => []),
            fetchWithAuth("/api/alerts").catch(() => []),
        ]).then(([r, a]) => {
            setReports(Array.isArray(r) ? r : []);
            setAlerts(Array.isArray(a) ? a : []);
        });
    }, []);

    const grouped = {};
    reports.forEach(r => {
        const d = r.createdAt ? new Date(r.createdAt) : new Date();
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        grouped[key] = (grouped[key] || 0) + 1;
    });
    const dailyData = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0])).map(([date, count]) => ({ date, count }));

    const crisisCounts = {};
    reports.forEach(r => { const t = r.crisisType || "unknown"; crisisCounts[t] = (crisisCounts[t] || 0) + 1; });
    const crisisTypeData = Object.entries(crisisCounts).map(([name, value]) => ({ name: CRISIS_LABELS[name] || name, value }));

    const statusCounts = { Active: 0, Resolved: 0, Critical: 0 };
    reports.forEach(r => { const s = r.status || "Active"; statusCounts[s] = (statusCounts[s] || 0) + 1; });

    const reportData = { daily: dailyData.length > 0 ? dailyData : [{ date: "No data", count: 0 }] };
    const stats = {
        totalReports: reports.length,
        activeReports: statusCounts.Active || 0,
        totalAlerts: alerts.length,
        criticalEvents: statusCounts.Critical || 0,
    };

    return (
        <div className="space-y-4 sm:space-y-6" ref={dashboardRef}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 text-sm sm:text-lg font-semibold mb-1">Total Reports</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.totalReports}</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-yellow-600 text-sm sm:text-lg font-semibold mb-1">Active Crises</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.activeReports}</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-purple-600 text-sm sm:text-lg font-semibold mb-1">Total Alerts</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.totalAlerts}</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-red-600 text-sm sm:text-lg font-semibold mb-1">Critical Events</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.criticalEvents}</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-6">
                <div className="flex flex-col justify-between items-start gap-3 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">Reports Timeline</h3>
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex flex-wrap gap-2">
                            {["daily", "weekly", "monthly", "yearly"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setView(type)}
                                    className={`px-2 sm:px-3 py-1 rounded text-xs ${view === type
                                        ? "bg-blue-100 text-blue-700 font-medium border border-blue-200"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {["bar", "line"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setChartType(type)}
                                    className={`px-2 sm:px-3 py-1 rounded text-xs ${chartType === type
                                        ? "bg-green-100 text-green-700 font-medium border border-green-200"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="h-48 sm:h-60 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <BarChart data={reportData.daily}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Bar dataKey="count" fill="#3b82f6" name="Reports" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={reportData.daily}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    name="Reports"
                                    strokeWidth={2}
                                    dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                                    activeDot={{ r: window.innerWidth < 768 ? 5 : 6 }}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-6">Crisis Type Distribution</h3>
                    <div className="h-44 sm:h-52 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={crisisTypeData.length > 0 ? crisisTypeData : [{ name: "No data", value: 1 }]}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={window.innerWidth < 768 ? 40 : 60}
                                    outerRadius={window.innerWidth < 768 ? 70 : 90}
                                    paddingAngle={2}
                                    label={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                                >
                                    {distributionByWilaya.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`${value} reports`, name]}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: window.innerWidth < 768 ? '10px' : '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
                        {(crisisTypeData.length > 0 ? crisisTypeData : []).slice(0, 4).map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-xs sm:text-sm">{item.name}: <strong>{item.value}</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-6">Crisis Type Distribution</h3>
                    <div className="h-44 sm:h-52 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={crisisTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={0}
                                    outerRadius={window.innerWidth < 768 ? 70 : 90}
                                    paddingAngle={0}
                                    label={{ fontSize: window.innerWidth < 768 ? 10 : 12 }}
                                >
                                    {crisisTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value, name) => [`${value} reports`, name]}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px',
                                        fontSize: window.innerWidth < 768 ? '10px' : '12px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1 sm:gap-2">
                        {crisisTypeData.map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-xs sm:text-sm">{item.name}: <strong>{item.value}</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStatics;