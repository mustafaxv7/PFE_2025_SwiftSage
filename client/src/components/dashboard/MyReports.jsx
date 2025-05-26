import { useState, useEffect } from "react";
import { Search, MapPin, FileText, Calendar, AlertCircle, Flag, X, Edit, ChevronDown, Save } from "lucide-react";

const MyReports = () => {
    const sampleReports = [
        {
            id: 1,
            title: "Inondation à Chettia",
            date: "10 Mars, 2025",
            crisisType: "flood",
            description: "Inondation majeure dans le centre-ville de Chettia affectant les zones résidentielles.",
            location: "Chettia, Chlef",
            lat: "36.1647",
            lng: "1.3317",
            roadStatus: "flooded",
            missing: 3,
            trapped: 12,
            submergedDwelling: 48,
            electrification: "dangerous",
            status: "active",
            submittedBy: "Ahmed Benali",
            importance: "high"
        },
        {
            id: 2,
            title: "Séisme à Oued Fodda",
            date: "15 Mars, 2025",
            crisisType: "earthquake",
            description: "Séisme de magnitude 5.8 ayant causé d'importants dégâts structurels dans la région.",
            location: "Oued Fodda, Chlef",
            lat: "36.2200",
            lng: "1.3383",
            roadStatus: "partially_blocked",
            injuredNumber: 24,
            bleedingNumber: 8,
            throttled: 3,
            burnt: 0,
            fractions: 14,
            electrification: "partial",
            status: "resolved",
            submittedBy: "Karima Hadj",
            importance: "critical"
        },
        {
            id: 3,
            title: "Incendie de forêt à Sendjas",
            date: "2 Avril, 2025",
            crisisType: "forest_fire",
            description: "Feu de forêt se propageant à travers les forêts du nord de Sendjas.",
            location: "Sendjas, Chlef",
            lat: "36.0833",
            lng: "1.2167",
            roadStatus: "smoke_covered",
            burntArea: 1240,
            spreadRate: "rapid",
            evacuated: 860,
            threatenedStructures: 126,
            containmentPercent: 35,
            status: "active",
            submittedBy: "Sofiane Amrouche",
            importance: "high"
        }
    ];

    const loadReportsFromStorage = () => {
        try {
            const storedReports = localStorage.getItem('userReports');
            if (storedReports) {
                const parsedReports = JSON.parse(storedReports);
                return parsedReports.length > 0 ? parsedReports : sampleReports;
            }
            localStorage.setItem('userReports', JSON.stringify(sampleReports));
            return sampleReports;
        } catch (error) {
            console.error('Error loading reports from localStorage:', error);
            return sampleReports;
        }
    };

    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedReport, setEditedReport] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        setReports(loadReportsFromStorage());
    }, []);

    const handleReportClick = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
        setIsEditing(false);
        setEditedReport(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditedReport(null);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedReport({ ...selectedReport });
    };

    const handleSaveEdit = () => {
        const updatedReports = reports.map(report =>
            report.id === editedReport.id ? editedReport : report
        );

        setReports(updatedReports);
        setSelectedReport(editedReport);
        setIsEditing(false);
        localStorage.setItem('userReports', JSON.stringify(updatedReports));
        try {
            const adminReports = JSON.parse(localStorage.getItem('adminReports') || '[]');
            const updatedAdminReports = adminReports.map(report =>
                report.id === editedReport.id ? editedReport : report
            );
            localStorage.setItem('adminReports', JSON.stringify(updatedAdminReports));
        } catch (error) {
            console.error('Error updating admin reports:', error);
        }

        alert("Report updated successfully!");
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedReport(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedReport(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "active":
                return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>Active</span>;
            case "resolved":
                return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>Resolved</span>;
            case "in_progress":
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>In Progress</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></span>Unknown</span>;
        }
    };

    const getImportanceBadge = (importance) => {
        switch (importance) {
            case "critical":
                return <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Critical</span>;
            case "high":
                return <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">High</span>;
            case "medium":
                return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Medium</span>;
            case "low":
                return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Low</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Unknown</span>;
        }
    };

    const getCrisisTypeIcon = (type) => {
        switch (type) {
            case "earthquake":
                return <AlertCircle className="text-orange-500" />;
            case "flood":
                return <AlertCircle className="text-blue-500" />;
            case "industrial_fire":
                return <AlertCircle className="text-red-500" />;
            case "forest_fire":
                return <AlertCircle className="text-red-600" />;
            default:
                return <AlertCircle className="text-gray-500" />;
        }
    };

    const filteredReports = reports.filter(report => {
        return searchQuery === "" || report.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">My Reports</h2>
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Search reports..."
                        className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {reports.length === 0 ? (
                <div className="text-center py-10">
                    <FileText className="mx-auto text-gray-400" size={48} />
                    <p className="mt-2 text-gray-500">No reports found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {filteredReports.map((report) => (
                        <div
                            key={report.id}
                            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                            onClick={() => handleReportClick(report)}
                        >
                            <div className="p-3 sm:p-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center min-w-0">
                                        <div className="flex-shrink-0">
                                            {getCrisisTypeIcon(report.crisisType)}
                                        </div>
                                        <h3 className="font-medium text-sm sm:text-base ml-2 truncate">{report.title}</h3>
                                    </div>
                                    <div className="flex-shrink-0">
                                        {getStatusBadge(report.status)}
                                    </div>
                                </div>
                                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 line-clamp-2">{report.description}</div>
                                <div className="mt-3 sm:mt-4 flex items-center text-xs text-gray-500 overflow-hidden">
                                    <MapPin size={12} className="flex-shrink-0 mr-1" />
                                    <span className="truncate">{report.location}</span>
                                </div>
                                <div className="mt-1 sm:mt-2 flex items-center text-xs text-gray-500">
                                    <Calendar size={12} className="flex-shrink-0 mr-1" />
                                    <span>{report.date}</span>
                                </div>
                                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                                    {getImportanceBadge(report.importance)}
                                    <span className="text-xs text-gray-500 truncate max-w-full">Submitted by: {report.submittedBy}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {isModalOpen && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-0">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Report Details</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                        </div>

                        <div className="p-4 sm:p-6">

                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                                        {getCrisisTypeIcon(selectedReport.crisisType)}
                                        <span className="ml-2 break-words">{selectedReport.title}</span>
                                    </h2>
                                    <div className="flex items-center mt-2 text-gray-600">
                                        <MapPin size={16} className="mr-1 flex-shrink-0" />
                                        <span className="break-words">{selectedReport.location}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                                    {getStatusBadge(selectedReport.status)}
                                    {getImportanceBadge(selectedReport.importance)}
                                </div>
                            </div>


                            <div className="mt-6">
                                <h4 className="text-lg font-medium text-gray-800 mb-2">Description</h4>
                                {isEditing ? (
                                    <textarea
                                        name="description"
                                        value={editedReport.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        rows="4"
                                    />
                                ) : (
                                    <p className="text-gray-600">{selectedReport.description}</p>
                                )}
                            </div>

                            <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Details</h4>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                        <div className="text-sm text-gray-500">Date Reported:</div>
                                        <div className="text-sm font-medium">
                                            {selectedReport.date.replace('_', ' ')}
                                        </div>

                                        <div className="text-sm text-gray-500">Crisis Type:</div>
                                        <div className="text-sm font-medium capitalize">
                                            {selectedReport.crisisType.replace('_', ' ')}
                                        </div>

                                        <div className="text-sm text-gray-500">Road Status:</div>
                                        <div className="text-sm font-medium">
                                            {isEditing ? (
                                                <select
                                                    name="roadStatus"
                                                    value={editedReport.roadStatus}
                                                    onChange={handleInputChange}
                                                    className="w-full p-1 border border-gray-300 rounded-md"
                                                >
                                                    <option value="clear">Clear</option>
                                                    <option value="blocked">Blocked</option>
                                                    <option value="partially_blocked">Partially Blocked</option>
                                                    <option value="flooded">Flooded</option>
                                                    <option value="smoke_covered">Smoke Covered</option>
                                                    <option value="inaccessible">Inaccessible</option>
                                                    <option value="hazardous">Hazardous</option>
                                                </select>
                                            ) : (
                                                selectedReport.roadStatus.replace('_', ' ')
                                            )}
                                        </div>

                                        <div className="text-sm text-gray-500">Submitted By:</div>
                                        <div className="text-sm font-medium">
                                            {selectedReport.submittedBy.replace('_', ' ')}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-2">Impact</h4>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                                        {selectedReport.missing !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Missing Persons:</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            name="missing"
                                                            value={editedReport.missing}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        />
                                                    ) : (
                                                        selectedReport.missing
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {selectedReport.trapped !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Trapped Persons:</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            name="trapped"
                                                            value={editedReport.trapped}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        />
                                                    ) : (
                                                        selectedReport.trapped
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {selectedReport.submergedDwelling !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Submerged Dwellings:</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            name="submergedDwelling"
                                                            value={editedReport.submergedDwelling}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        />
                                                    ) : (
                                                        selectedReport.submergedDwelling
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {selectedReport.injuredNumber !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Injured People:</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            name="injuredNumber"
                                                            value={editedReport.injuredNumber}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        />
                                                    ) : (
                                                        selectedReport.injuredNumber
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {selectedReport.burntArea !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Burnt Area (hectares):</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            name="burntArea"
                                                            value={editedReport.burntArea}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        />
                                                    ) : (
                                                        selectedReport.burntArea
                                                    )}
                                                </div>
                                            </>
                                        )}
                                        {selectedReport.electrification !== undefined && (
                                            <>
                                                <div className="text-sm text-gray-500">Electrification Status:</div>
                                                <div className="text-sm font-medium">
                                                    {isEditing ? (
                                                        <select
                                                            name="electrification"
                                                            value={editedReport.electrification}
                                                            onChange={handleInputChange}
                                                            className="w-full p-1 border border-gray-300 rounded-md"
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                            <option value="partial">Partial</option>
                                                            <option value="dangerous">Dangerous</option>
                                                            <option value="unknown">Unknown</option>
                                                        </select>
                                                    ) : (
                                                        selectedReport.electrification
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                {isEditing ? (
                                    <>
                                        <button onClick={handleSaveEdit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                                            <Save size={16} className="inline mr-1" /> Save Changes
                                        </button>
                                        <button onClick={handleCancelEdit} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition">
                                            <Flag size={16} className="inline mr-1" /> Flag Report
                                        </button>
                                        <button onClick={handleEditClick} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                                            <Edit size={16} className="inline mr-1" /> Edit Report
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReports;