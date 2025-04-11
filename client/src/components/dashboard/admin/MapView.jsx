import { useEffect, useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";

const MapView = () => {
    const [reports, setReports] = useState([]);
    const [crisisType, setCrisisType] = useState("all");
    const [severity, setSeverity] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            // Simulated data - in a real app, this would be an API call
            const data = [
                {
                    id: 1,
                    title: "Flood in Nairobi",
                    location: "Nairobi, Kenya",
                    coordinates: { lat: -1.286389, lng: 36.817223 },
                    severity: "high",
                    type: "flood",
                    date: "April 2, 2025",
                    description: "Major flooding affecting downtown area with road closures and property damage.",
                    affectedArea: "12 km²",
                    evacuees: 230,
                    status: "active"
                },
                {
                    id: 2,
                    title: "Earthquake in Mexico",
                    location: "Mexico City, Mexico",
                    coordinates: { lat: 19.4326, lng: -99.1332 },
                    severity: "critical",
                    type: "earthquake",
                    date: "March 15, 2025",
                    description: "6.4 magnitude earthquake causing structural damage.",
                    affectedArea: "50 km radius",
                    injured: 42,
                    status: "active"
                },
                {
                    id: 3,
                    title: "Forest Fire in California",
                    location: "Mendocino County, CA",
                    coordinates: { lat: 39.3076, lng: -123.7994 },
                    severity: "high",
                    type: "forest_fire",
                    date: "April 2, 2025",
                    description: "Wildfire spreading across northern California forests.",
                    burntArea: "1240 hectares",
                    contained: "35%",
                    status: "active"
                }
            ];
            setReports(data);
            if (data.length > 0) {
                setMapCenter(data[0].coordinates);
                setMapZoom(6);
            }
        };
        fetchReports();
    }, []);

    const filteredReports = reports.filter(report => {
        if (crisisType !== "all" && report.type !== crisisType) return false;
        if (severity !== "all" && report.severity !== severity) return false;
        if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Crisis Map Overview</h2>
                    <p className="text-gray-600">Visualizing {filteredReports.length} active crisis reports</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
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

                    <div className="flex gap-2">
                        <div className="relative">
                            <select
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-8 appearance-none"
                                value={crisisType}
                                onChange={(e) => setCrisisType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="flood">Flood</option>
                                <option value="earthquake">Earthquake</option>
                                <option value="forest_fire">Forest Fire</option>
                                <option value="industrial_fire">Industrial Fire</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 pr-8 appearance-none"
                                value={severity}
                                onChange={(e) => setSeverity(e.target.value)}
                            >
                                <option value="all">All Severity</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={mapCenter}
                        zoom={mapZoom}
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false
                        }}
                    >
                        {filteredReports.map(report => (
                            <Marker
                                key={report.id}
                                position={report.coordinates}
                                icon={{
                                    path: window.google.maps.SymbolPath.CIRCLE,
                                    fillColor: getMarkerColor(report.type),
                                    fillOpacity: 1,
                                    strokeWeight: 0,
                                    scale: 8
                                }}
                                onClick={() => {
                                    setSelectedReport(report);
                                    setMapCenter(report.coordinates);
                                    setMapZoom(12);
                                }}
                            />
                        ))}

                        {selectedReport && (
                            <InfoWindow
                                position={selectedReport.coordinates}
                                onCloseClick={() => setSelectedReport(null)}
                            >
                                <div className="p-2 max-w-xs">
                                    <h3 className="font-bold text-gray-800 mb-1">{selectedReport.title}</h3>
                                    <div className="flex items-center text-sm text-gray-600 mb-1">
                                        <MapPin size={14} className="mr-1" />
                                        {selectedReport.location}
                                    </div>
                                    <div className="text-sm text-gray-700 mb-2">{selectedReport.description}</div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Type: {selectedReport.type.replace('_', ' ')}</span>
                                        <span>Severity: {selectedReport.severity}</span>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
            </div>
            */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredReports.slice(0, 3).map(report => (
                    <div
                        key={report.id}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                            setSelectedReport(report);
                            setMapCenter(report.coordinates);
                            setMapZoom(12);
                        }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{report.title}</h3>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    report.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                        report.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                            'bg-blue-100 text-blue-800'
                                }`}
                            >
                                {report.severity}
                            </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                            <MapPin size={14} className="mr-1" />
                            {report.location}
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{report.description}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{report.date}</span>
                            <span className="capitalize">{report.type.replace('_', ' ')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapView;