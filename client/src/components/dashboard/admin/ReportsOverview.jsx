import { useState, useEffect } from "react";
import { AlertTriangle, Filter, ChevronDown, Search, MapPin, BarChart2 } from "lucide-react";

const ReportsOverview = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filterType, setFilterType] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            const data = [
                {
                    id: 1,
                    title: "Flood in Nairobi",
                    date: "March 10, 2025",
                    crisisType: "flood",
                    description: "Major flooding in downtown Nairobi affecting residential areas.",
                    location: "Nairobi, Kenya",
                    lat: "-1.286389",
                    lng: "36.817223",
                    roadStatus: "flooded",
                    missing: 3,
                    trapped: 12,
                    submergedDwelling: 48,
                    electrification: "dangerous",
                    status: "active",
                    submittedBy: "John Doe",
                    importance: "high"
                },
                {
                    id: 2,
                    title: "Earthquake in Mexico",
                    date: "March 15, 2025",
                    crisisType: "earthquake",
                    description: "6.4 magnitude earthquake that caused significant structural damage.",
                    location: "Mexico City, Mexico",
                    lat: "19.4326",
                    lng: "-99.1332",
                    roadStatus: "partially_blocked",
                    injuredNumber: 24,
                    bleedingNumber: 8,
                    throttled: 3,
                    burnt: 0,
                    fractions: 14,
                    electrification: "partial",
                    status: "resolved",
                    submittedBy: "Jane Smith",
                    importance: "critical"
                },
                {
                    id: 3,
                    title: "Forest Fire in California",
                    date: "April 2, 2025",
                    crisisType: "forest_fire",
                    description: "Wildfire spreading across northern California forests.",
                    location: "Mendocino County, CA",
                    lat: "39.3076",
                    lng: "-123.7994",
                    roadStatus: "smoke_covered",
                    burntArea: 1240,
                    spreadRate: "rapid",
                    evacuated: 860,
                    threatenedStructures: 126,
                    containmentPercent: 35,
                    status: "active",
                    submittedBy: "Alex Johnson",
                    importance: "high"
                },
                {
                    id: 4,
                    title: "Industrial Fire in Detroit",
                    date: "March 28, 2025",
                    crisisType: "industrial_fire",
                    description: "Chemical plant fire with potential hazardous materials release.",
                    location: "Detroit, MI",
                    lat: "42.3314",
                    lng: "-83.0458",
                    roadStatus: "closed",
                    burnt: 3500,
                    explosion: "Yes",
                    institutionType: "chemical_plant",
                    trapped: 5,
                    electrification: "offline",
                    status: "in_progress",
                    submittedBy: "Robert Chen",
                    importance: "critical"
                },
                {
                    id: 5,
                    title: "Coastal Flooding in Miami",
                    date: "April 5, 2025",
                    crisisType: "flood",
                    description: "Coastal flooding affecting south beach and downtown areas.",
                    location: "Miami, FL",
                    lat: "25.7617",
                    lng: "-80.1918",
                    roadStatus: "flooded",
                    missing: 0,
                    trapped: 8,
                    submergedDwelling: 23,
                    electrification: "partial",
                    status: "active",
                    submittedBy: "Maria Rodriguez",
                    importance: "medium"
                }
            ];
            setReports(data);
        };
        fetchReports();
    }, []);

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>;
            case "resolved":
                return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Resolved</span>;
            case "in_progress":
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Unknown</span>;
        }
    };

    const getImportanceBadge = (importance) => {
        switch (importance) {
            case "critical":
                return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Critical</span>;
            case "high":
                return <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">High</span>;
            case "medium":
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>;
            case "low":
                return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Low</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Unknown</span>;
        }
    };

    const getCrisisTypeIcon = (type) => {
        switch (type) {
            case "earthquake":
                return "🌋";
            case "flood":
                return "🌊";
            case "industrial_fire":
                return "🏭";
            case "forest_fire":
                return "🔥";
            default:
                return "⚠️";
        }
    };

    const renderCrisisDetails = (report) => {
        switch (report.crisisType) {
            case "earthquake":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Road Status</h4>
                            <p className="capitalize">{report.roadStatus?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Injured</h4>
                            <p>{report.injuredNumber || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Bleeding</h4>
                            <p>{report.bleedingNumber || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Throttled</h4>
                            <p>{report.throttled || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Burnt</h4>
                            <p>{report.burnt || '0'} structures</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Fractions</h4>
                            <p>{report.fractions || '0'} incidents</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Electrification</h4>
                            <p className="capitalize">{report.electrification?.replace(/_/g, ' ') || 'Unknown'}</p>
                        </div>
                    </div>
                );
            case "flood":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Road Status</h4>
                            <p className="capitalize">{report.roadStatus?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Missing</h4>
                            <p>{report.missing || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Trapped</h4>
                            <p>{report.trapped || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Submerged Dwellings</h4>
                            <p>{report.submergedDwelling || '0'} buildings</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Electrification</h4>
                            <p className="capitalize">{report.electrification?.replace(/_/g, ' ') || 'Unknown'}</p>
                        </div>
                    </div>
                );
            case "industrial_fire":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Burnt Area</h4>
                            <p>{report.burnt || '0'} sq m</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Road Status</h4>
                            <p className="capitalize">{report.roadStatus?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Explosion</h4>
                            <p className="capitalize">{report.explosion || 'No'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Type of Institution</h4>
                            <p className="capitalize">{report.institutionType?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Trapped</h4>
                            <p>{report.trapped || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Electrification</h4>
                            <p className="capitalize">{report.electrification?.replace(/_/g, ' ') || 'Unknown'}</p>
                        </div>
                    </div>
                );
            case "forest_fire":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Road Status</h4>
                            <p className="capitalize">{report.roadStatus?.replace(/_/g, ' ') || 'N/A'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Burnt Area</h4>
                            <p>{report.burntArea || '0'} hectares</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Fire Spread Rate</h4>
                            <p className="capitalize">{report.spreadRate || 'Unknown'}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Evacuated</h4>
                            <p>{report.evacuated || '0'} people</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Threatened Structures</h4>
                            <p>{report.threatenedStructures || '0'} buildings</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Containment</h4>
                            <p>{report.containmentPercent || '0'}%</p>
                        </div>
                    </div>
                );
            default:
                return <p className="text-gray-500 italic">No specific details available</p>;
        }
    };

    const filteredReports = reports.filter(report => {
        if (filterType !== "all" && report.crisisType !== filterType) {
            return false;
        }
        if (filterStatus !== "all" && report.status !== filterStatus) {
            return false;
        }
        if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !report.location.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    const reportStats = {
        total: reports.length,
        active: reports.filter(r => r.status === "active").length,
        resolved: reports.filter(r => r.status === "resolved").length,
        inProgress: reports.filter(r => r.status === "in_progress").length,
        critical: reports.filter(r => r.importance === "critical").length
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Reports Overview</h2>
                <p className="text-gray-600 mt-1">Monitoring {reportStats.total} crisis reports across regions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-blue-800 font-medium">Total Reports</p>
                            <p className="text-2xl font-bold text-blue-900">{reportStats.total}</p>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-full">
                            <BarChart2 size={20} className="text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-red-800 font-medium">Active</p>
                            <p className="text-2xl font-bold text-red-900">{reportStats.active}</p>
                        </div>
                        <div className="bg-red-100 p-2 rounded-full">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-green-800 font-medium">Resolved</p>
                            <p className="text-2xl font-bold text-green-900">{reportStats.resolved}</p>
                        </div>
                        <div className="bg-green-100 p-2 rounded-full">
                            <div className="text-green-600">✓</div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-yellow-800 font-medium">Critical</p>
                            <p className="text-2xl font-bold text-yellow-900">{reportStats.critical}</p>
                        </div>
                        <div className="bg-yellow-100 p-2 rounded-full">
                            <div className="text-yellow-600">⚠️</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                        placeholder="Search reports..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-2 w-full md:w-auto">
                    <div className="relative w-full md:w-auto">
                        <select
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-8 appearance-none"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">All Types</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="flood">Flood</option>
                            <option value="industrial_fire">Industrial Fire</option>
                            <option value="forest_fire">Forest Fire</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown size={16} className="text-gray-400" />
                        </div>
                    </div>

                    <div className="relative w-full md:w-auto">
                        <select
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-8 appearance-none"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="resolved">Resolved</option>
                            <option value="in_progress">In Progress</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <ChevronDown size={16} className="text-gray-400" />
                        </div>
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reported By</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {filteredReports.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="py-8 px-4 text-center text-gray-500">
                                No reports match your filters
                            </td>
                        </tr>
                    ) : (
                        filteredReports.map(report => (
                            <tr
                                key={report.id}
                                onClick={() => handleReportClick(report)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="py-4 px-4">
                    <span className="text-xl" title={report.crisisType?.replace(/_/g, ' ')}>
                      {getCrisisTypeIcon(report.crisisType)}
                    </span>
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-900">{report.title}</td>
                                <td className="py-4 px-4 text-gray-600">
                                    <div className="flex items-center">
                                        <MapPin size={14} className="mr-1 text-gray-400" />
                                        {report.location}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-gray-500">{report.date}</td>
                                <td className="py-4 px-4">{getStatusBadge(report.status)}</td>
                                <td className="py-4 px-4">{getImportanceBadge(report.importance)}</td>
                                <td className="py-4 px-4 text-gray-600">{report.submittedBy}</td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{filteredReports.length}</span> of{" "}
                    <span className="font-medium">{reports.length}</span> reports
                </div>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        1
                    </button>
                    <button className="px-3 py-1 border border-blue-500 rounded-md text-sm font-medium text-white bg-blue-500">
                        2
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        3
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Next
                    </button>
                </div>
            </div>
            {isModalOpen && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-2xl">{getCrisisTypeIcon(selectedReport.crisisType)}</span>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedReport.title}</h3>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{selectedReport.date}</p>
                                </div>
                                <div className="flex space-x-2">
                                    {getStatusBadge(selectedReport.status)}
                                    {getImportanceBadge(selectedReport.importance)}
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-medium text-gray-700">Description</h4>
                                <p className="mt-1 text-gray-600">{selectedReport.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <h4 className="font-medium text-gray-700">Location</h4>
                                    <p>{selectedReport.location}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Coordinates</h4>
                                    <p>Lat: {selectedReport.lat}, Lng: {selectedReport.lng}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Reported By</h4>
                                    <p>{selectedReport.submittedBy}</p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-800">Crisis Details</h4>
                                {renderCrisisDetails(selectedReport)}
                            </div>

                            <div className="h-48 bg-gray-200 mt-6 rounded flex items-center justify-center">
                                <p className="text-gray-500">Map View</p>
                            </div>

                            <div className="flex justify-end mt-6 space-x-3">
                                <button
                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                                    onClick={() => {
                                        const updatedStatus = selectedReport.status === "active" ? "resolved" : "active";
                                        setReports(
                                            reports.map(r =>
                                                r.id === selectedReport.id ? {...r, status: updatedStatus} : r
                                            )
                                        );
                                        setSelectedReport({...selectedReport, status: updatedStatus});
                                    }}
                                >
                                    {selectedReport.status === "active" ? "Mark as Resolved" : "Reactivate Alert"}
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                    onClick={() => alert("Edit functionality would go here")}
                                >
                                    Edit Report
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsOverview;