import { useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, CartesianGrid, LineChart, Line
} from "recharts";

const COLORS = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6", "#ec4899",
    "#14b8a6", "#f97316", "#06b6d4", "#84cc16", "#a855f7", "#d946ef", "#0ea5e9"
];

const AdminStatistics = () => {
    const [view, setView] = useState("daily");
    const [chartType, setChartType] = useState("bar");
    const reportData = {
        daily: [
            { date: "Apr 5", count: 5 },
            { date: "Apr 6", count: 2 },
            { date: "Apr 7", count: 4 },
            { date: "Apr 8", count: 1 },
            { date: "Apr 9", count: 3 },
            { date: "Apr 10", count: 4 },
            { date: "Apr 11", count: 6 },
        ],
        weekly: [
            { date: "Week 1", count: 6 },
            { date: "Week 2", count: 8 },
            { date: "Week 3", count: 5 },
            { date: "Week 4", count: 10 },
        ],
        monthly: [
            { date: "Jan 2025", count: 12 },
            { date: "Feb 2025", count: 18 },
            { date: "Mar 2025", count: 22 },
            { date: "Apr 2025", count: 15 },
        ]
    };

    const distributionByWilaya = [
        { name: "Alger", value: 6 },
        { name: "Oran", value: 4 },
        { name: "Tizi Ouzou", value: 3 },
        { name: "Constantine", value: 5 },
        { name: "Chlef", value: 6 },
        { name: "Blida", value: 2 },
        { name: "Annaba", value: 3 },
        { name: "Sétif", value: 4 },
    ];

    const crisisTypeData = [
        { name: "Flood", value: 12 },
        { name: "Earthquake", value: 8 },
        { name: "Fire", value: 14 },
        { name: "Storm", value: 9 },
        { name: "Other", value: 3 }
    ];

    // Statistics summary
    const stats = {
        totalReports: 46,
        activeReports: 18,
        avgResponseTime: "4.2 hours",
        criticalEvents: 8
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Custom range</option>
                    </select>
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                        Export Report
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-blue-600 text-lg font-semibold mb-1">Total Reports</div>
                    <div className="text-3xl font-bold">{stats.totalReports}</div>
                    <div className="text-green-600 text-sm mt-2">↑ 12% from last month</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-yellow-600 text-lg font-semibold mb-1">Active Crises</div>
                    <div className="text-3xl font-bold">{stats.activeReports}</div>
                    <div className="text-red-600 text-sm mt-2">↑ 3% from last month</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-purple-600 text-lg font-semibold mb-1">Avg Response Time</div>
                    <div className="text-3xl font-bold">{stats.avgResponseTime}</div>
                    <div className="text-green-600 text-sm mt-2">↓ 0.8 hrs improvement</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-red-600 text-lg font-semibold mb-1">Critical Events</div>
                    <div className="text-3xl font-bold">{stats.criticalEvents}</div>
                    <div className="text-red-600 text-sm mt-2">↑ 2 more than last month</div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Reports Timeline</h3>
                    <div className="flex gap-4">
                        <div className="flex gap-2">
                            {["daily", "weekly", "monthly"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setView(type)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        view === type
                                            ? "bg-blue-100 text-blue-700 font-medium border border-blue-200"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            {["bar", "line"].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setChartType(type)}
                                    className={`px-3 py-1 rounded text-sm ${
                                        chartType === type
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

                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        {chartType === 'bar' ? (
                            <BarChart data={reportData[view]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                <Bar dataKey="count" fill="#3b82f6" name="Reports" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={reportData[view]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    name="Reports"
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Distribution by Region</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionByWilaya}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={2}
                                    label
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
                                        borderRadius: '4px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {distributionByWilaya.slice(0, 4).map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">{item.name}: <strong>{item.value}</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Crisis Type Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={crisisTypeData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={0}
                                    outerRadius={90}
                                    paddingAngle={0}
                                    label
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
                                        borderRadius: '4px'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        {crisisTypeData.map((item, index) => (
                            <div key={item.name} className="flex items-center">
                                <div
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">{item.name}: <strong>{item.value}</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;