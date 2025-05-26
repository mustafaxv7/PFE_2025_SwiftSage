import { useState, useRef } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, CartesianGrid, LineChart, Line
} from "recharts";

const COLORS = [
    "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1", "#8b5cf6", "#ec4899",
    "#14b8a6", "#f97316", "#06b6d4", "#84cc16", "#a855f7", "#d946ef", "#0ea5e9"
];

const AdminStatics = () => {
    const [view, setView] = useState("daily");
    const [chartType, setChartType] = useState("bar");
    const dashboardRef = useRef(); 

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
        ],
        yearly: [
            { date: "2022", count: 32 },
            { date: "2023", count: 48 },
            { date: "2024", count: 67 },
            { date: "2025", count: 46 },
        ]
    };

    const distributionByWilaya = [
        { name: "Chlef", value: 6 },
        { name: "Sendjas", value: 4 },
        { name: "Oum Drou", value: 3 },
        { name: "Oued Fodda", value: 5 },
        { name: "Beni Rached", value: 2 },
        { name: "Ouled Abbes", value: 3 },
        { name: "El Karimia", value: 4 },
        { name: "Harchoun", value: 3 },
        { name: "Beni Bouateb", value: 2 },
        { name: "Zeboudja", value: 5 },
        { name: "Bénairia", value: 3 },
        { name: "Bouzeghaia", value: 4 },
    ];

    const crisisTypeData = [
        { name: "Flood", value: 12 },
        { name: "Earthquake", value: 8 },
        { name: "Fire", value: 14 },
    ];

    const stats = {
        totalReports: 46,
        activeReports: 18,
        avgResponseTime: "4.2 hours",
        criticalEvents: 8
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
                    <div className="text-green-600 text-xs sm:text-sm mt-1 sm:mt-2">↑ 12% from last month</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-yellow-600 text-sm sm:text-lg font-semibold mb-1">Active Crises</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.activeReports}</div>
                    <div className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2">↑ 3% from last month</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-purple-600 text-sm sm:text-lg font-semibold mb-1">Avg Response Time</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.avgResponseTime}</div>
                    <div className="text-green-600 text-xs sm:text-sm mt-1 sm:mt-2">↓ 0.8 hrs improvement</div>
                </div>
                <div className="bg-white p-3 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="text-red-600 text-sm sm:text-lg font-semibold mb-1">Critical Events</div>
                    <div className="text-xl sm:text-3xl font-bold">{stats.criticalEvents}</div>
                    <div className="text-red-600 text-xs sm:text-sm mt-1 sm:mt-2">↑ 2 more than last month</div>
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
                            <BarChart data={reportData[view]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="date" tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <YAxis tick={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: window.innerWidth < 768 ? 10 : 12 }} />
                                <Bar dataKey="count" fill="#3b82f6" name="Reports" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        ) : (
                            <LineChart data={reportData[view]}>
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
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-6">Distribution by Region</h3>
                    <div className="h-44 sm:h-52 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={distributionByWilaya}
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
                        {distributionByWilaya.slice(0, 4).map((item, index) => (
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