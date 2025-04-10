import {useState} from "react";

const MyReports = () => {
    const reports = [
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
        }
    ];

    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                return <span
                    className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>;
            case "resolved":
                return <span
                    className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Resolved</span>;
            case "in_progress":
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">In Progress</span>;
            default:
                return <span
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Unknown</span>;
        }
    };

    const getImportanceBadge = (importance) => {
        switch (importance) {
            case "critical":
                return <span
                    className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Critical</span>;
            case "high":
                return <span
                    className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">High</span>;
            case "medium":
                return <span
                    className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Medium</span>;
            case "low":
                return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Low</span>;
            default:
                return <span
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">Unknown</span>;
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

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Reports</h2>
                <div className="flex space-x-2">
                    <select className="bg-white border border-gray-300 rounded-md text-sm p-2">
                        <option>All Types</option>
                        <option>Earthquake</option>
                        <option>Flood</option>
                        <option>Industrial Fire</option>
                        <option>Forest Fire</option>
                    </select>
                    <select className="bg-white border border-gray-300 rounded-md text-sm p-2">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Resolved</option>
                        <option>In Progress</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {reports.map(report => (
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
                            <td className="py-4 px-4 text-gray-500">{report.date}</td>
                            <td className="py-4 px-4">{getStatusBadge(report.status)}</td>
                            <td className="py-4 px-4">{getImportanceBadge(report.importance)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
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

export default MyReports;