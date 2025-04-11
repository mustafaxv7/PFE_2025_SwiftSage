import {useState} from "react";
import {Search, MapPin, FileText, Calendar, AlertCircle, Flag, X, Edit, ChevronDown} from "lucide-react";

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
    const [filter, setFilter] = useState({
        type: "all",
        status: "all"
    });
    const [searchQuery, setSearchQuery] = useState("");

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
                return (
                    <span
                        className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
            Active
          </span>
                );
            case "resolved":
                return (
                    <span
                        className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
            Resolved
          </span>
                );
            case "in_progress":
                return (
                    <span
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1.5"></span>
            In Progress
          </span>
                );
            default:
                return (
                    <span
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-1.5"></span>
            Unknown
          </span>
                );
        }
    };

    const getImportanceBadge = (importance) => {
        switch (importance) {
            case "critical":
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Critical
          </span>
                );
            case "high":
                return (
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            High
          </span>
                );
            case "medium":
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Medium
          </span>
                );
            case "low":
                return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Low
          </span>
                );
            default:
                return (
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Unknown
          </span>
                );
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

    const getCrisisTypeName = (type) => {
        return type?.replace(/_/g, ' ').split(' ').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ') || 'Unknown';
    };

    const renderCrisisDetails = (report) => {
        switch (report.crisisType) {
            case "earthquake":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <DetailItem label="Road Status" value={report.roadStatus?.replace(/_/g, ' ') || 'N/A'}/>
                        <DetailItem label="Injured" value={`${report.injuredNumber || '0'} people`}/>
                        <DetailItem label="Bleeding" value={`${report.bleedingNumber || '0'} people`}/>
                        <DetailItem label="Throttled" value={`${report.throttled || '0'} people`}/>
                        <DetailItem label="Burnt" value={`${report.burnt || '0'} structures`}/>
                        <DetailItem label="Fractures" value={`${report.fractions || '0'} incidents`}/>
                        <DetailItem label="Electrification"
                                    value={report.electrification?.replace(/_/g, ' ') || 'Unknown'}/>
                    </div>
                );
            case "flood":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <DetailItem label="Road Status" value={report.roadStatus?.replace(/_/g, ' ') || 'N/A'}/>
                        <DetailItem label="Missing" value={`${report.missing || '0'} people`}/>
                        <DetailItem label="Trapped" value={`${report.trapped || '0'} people`}/>
                        <DetailItem label="Submerged Dwellings" value={`${report.submergedDwelling || '0'} buildings`}/>
                        <DetailItem label="Electrification"
                                    value={report.electrification?.replace(/_/g, ' ') || 'Unknown'}/>
                    </div>
                );
            case "industrial_fire":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <DetailItem label="Burnt Area" value={`${report.burnt || '0'} sq m`}/>
                        <DetailItem label="Road Status" value={report.roadStatus?.replace(/_/g, ' ') || 'N/A'}/>
                        <DetailItem label="Explosion Risk" value={report.explosion || 'No'}/>
                        <DetailItem label="Type of Institution"
                                    value={report.institutionType?.replace(/_/g, ' ') || 'N/A'}/>
                        <DetailItem label="Trapped" value={`${report.trapped || '0'} people`}/>
                        <DetailItem label="Electrification"
                                    value={report.electrification?.replace(/_/g, ' ') || 'Unknown'}/>
                    </div>
                );
            case "forest_fire":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <DetailItem label="Road Status" value={report.roadStatus?.replace(/_/g, ' ') || 'N/A'}/>
                        <DetailItem label="Burnt Area" value={`${report.burntArea || '0'} hectares`}/>
                        <DetailItem label="Fire Spread Rate" value={report.spreadRate || 'Unknown'}/>
                        <DetailItem label="Evacuated" value={`${report.evacuated || '0'} people`}/>
                        <DetailItem label="Threatened Structures"
                                    value={`${report.threatenedStructures || '0'} buildings`}/>
                        <DetailItem label="Containment" value={`${report.containmentPercent || '0'}%`}/>
                    </div>
                );
            default:
                return <p className="text-gray-500 italic">No specific details available</p>;
        }
    };

    const filteredReports = reports.filter(report => {
        const searchMatch = searchQuery === "" ||
            report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            report.location.toLowerCase().includes(searchQuery.toLowerCase());
        const typeMatch = filter.type === "all" || report.crisisType === filter.type;
        const statusMatch = filter.status === "all" || report.status === filter.status;

        return searchMatch && typeMatch && statusMatch;
    });

    const DetailItem = ({label, value}) => (
        <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500">{label}</h4>
            <p className="text-gray-800 capitalize font-medium mt-1">{value}</p>
        </div>
    );

    return (
        <>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <FileText className="mr-2 text-red-500" size={24}/>
                            My Reports
                        </h2>
                        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-gray-400"/>
                                </div>
                                <input
                                    type="text"
                                    className="focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="flex space-x-3">
                                <div className="relative">
                                    <select
                                        className="appearance-none focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-gray-700"
                                        value={filter.type}
                                        onChange={(e) => setFilter({...filter, type: e.target.value})}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="earthquake">Earthquake</option>
                                        <option value="flood">Flood</option>
                                        <option value="industrial_fire">Industrial Fire</option>
                                        <option value="forest_fire">Forest Fire</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4"/>
                                    </div>
                                </div>

                                <div className="relative">
                                    <select
                                        className="appearance-none focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md text-gray-700"
                                        value={filter.status}
                                        onChange={(e) => setFilter({...filter, status: e.target.value})}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="in_progress">In Progress</option>
                                    </select>
                                    <div
                                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <ChevronDown className="h-4 w-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-600 mt-1">View and manage your submitted crisis reports</p>
                </div>

                <div className="p-6">
                    {filteredReports.length === 0 ? (
                        <div className="text-center py-16 bg-gray-50 rounded-lg">
                            <FileText size={48} className="mx-auto text-gray-300 mb-4"/>
                            <h3 className="text-lg font-medium text-gray-700">No reports found</h3>
                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                <tr className="bg-gray-50">
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReports.map(report => (
                                    <tr
                                        key={report.id}
                                        onClick={() => handleReportClick(report)}
                                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xl"
                                                title={getCrisisTypeName(report.crisisType)}>
                                                {getCrisisTypeIcon(report.crisisType)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{report.title}</div>
                                            <div className="text-sm text-gray-500 flex items-center mt-1">
                                                <MapPin size={12} className="mr-1 text-gray-400"/> {report.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 flex items-center">
                                                <Calendar size={14} className="mr-2 text-gray-400"/>
                                                {report.date}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(report.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getImportanceBadge(report.importance)}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && selectedReport && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <div className="p-6 border-b border-gray-200">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <X size={20} className="text-gray-500"/>
                                </button>

                                <div className="flex items-start">
                                    <div
                                        className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-2xl mr-4">
                                        {getCrisisTypeIcon(selectedReport.crisisType)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{selectedReport.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar size={14} className="mr-1.5 text-gray-400"/> {selectedReport.date}
                      </span>
                                            <span className="text-sm text-gray-500 flex items-center">
                        <MapPin size={14} className="mr-1.5 text-gray-400"/> {selectedReport.location}
                      </span>
                                            <span className="text-sm text-gray-500">
                        {getCrisisTypeName(selectedReport.crisisType)}
                      </span>
                                        </div>
                                        <div className="flex flex-wrap mt-3 gap-2">
                                            {getStatusBadge(selectedReport.status)}
                                            {getImportanceBadge(selectedReport.importance)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="mb-6">
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2 flex items-center">
                                        <AlertCircle size={14} className="mr-2"/> Description
                                    </h4>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        {selectedReport.description}
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-2 flex items-center">
                                        <MapPin size={14} className="mr-2"/> Location Details
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <DetailItem label="Location" value={selectedReport.location}/>
                                        <DetailItem label="Coordinates"
                                                    value={`Lat: ${selectedReport.lat}, Lng: ${selectedReport.lng}`}/>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium flex items-center">
                                            <Flag size={14}
                                                  className="mr-2"/> {getCrisisTypeName(selectedReport.crisisType)} Details
                                        </h4>
                                    </div>
                                    {renderCrisisDetails(selectedReport)}
                                </div>

                                <div
                                    className="h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                    <div className="text-center">
                                        <MapPin size={32} className="mx-auto text-gray-400 mb-2"/>
                                        <p className="text-gray-500">Crisis Location Map</p>
                                        <p className="text-xs text-gray-400 mt-1">Interactive map would be displayed
                                            here</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                                <span
                                    className="text-sm text-gray-500">Submitted by: {selectedReport.submittedBy}</span>
                                <div className="flex gap-3">
                                    <button
                                        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center gap-2"
                                        onClick={() => alert("Edit functionality would go here")}
                                    >
                                        <Edit size={16}/> Edit Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MyReports;