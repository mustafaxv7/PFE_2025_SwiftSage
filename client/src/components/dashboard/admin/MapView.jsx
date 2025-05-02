import { useEffect, useState, useRef, useCallback } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 36.7538,
    lng: 3.0588
};

const MapView = () => {
    const [reports, setReports] = useState([]);
    const [crisisType, setCrisisType] = useState("all");
    const [severity, setSeverity] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState(center);
    const [mapZoom, setMapZoom] = useState(6);
    const [selectedReport, setSelectedReport] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const mapRef = useRef(null);

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const sampleReports = [
                    {
                        id: 1,
                        title: "Inondation à Chettia",
                        location: "Chettia, Chlef",
                        coordinates: { lat: 36.1647, lng: 1.3317 },
                        severity: "high",
                        type: "flood",
                        date: "10 Mars, 2025",
                        description: "Inondation majeure affectant le centre-ville de Chettia avec fermetures de routes et dommages matériels.",
                        affectedArea: "8 km²",
                        evacuees: 180,
                        status: "active"
                    },
                    {
                        id: 2,
                        title: "Séisme à Oued Fodda",
                        location: "Oued Fodda, Chlef",
                        coordinates: { lat: 36.2200, lng: 1.3383 },
                        severity: "critical",
                        type: "earthquake",
                        date: "15 Mars, 2025",
                        description: "Séisme de magnitude 5.8 causant des dommages structurels importants.",
                        affectedArea: "40 km de rayon",
                        injured: 35,
                        status: "active"
                    },
                    {
                        id: 3,
                        title: "Incendie de forêt à Sendjas",
                        location: "Sendjas, Chlef",
                        coordinates: { lat: 36.0833, lng: 1.2167 },
                        severity: "high",
                        type: "forest_fire",
                        date: "2 Avril, 2025",
                        description: "Feu de forêt se propageant à travers les forêts du nord de Sendjas.",
                        burntArea: "950 hectares",
                        contained: "35%",
                        status: "active"
                    }
                ];

                let data = [];
                const storedReports = localStorage.getItem('adminReports') || localStorage.getItem('userReports');

                if (storedReports) {
                    const parsedReports = JSON.parse(storedReports);
                    if (parsedReports && parsedReports.length > 0) {
                        data = parsedReports.map(report => ({
                            id: report.id,
                            title: report.title,
                            location: report.location || `${report.lat}, ${report.lng}`,
                            coordinates: {
                                lat: parseFloat(report.lat) || (report.coordinates ? parseFloat(report.coordinates.lat) : 0),
                                lng: parseFloat(report.lng) || (report.coordinates ? parseFloat(report.coordinates.lng) : 0)
                            },
                            severity: report.importance?.toLowerCase() || "medium",
                            type: report.crisisType,
                            date: report.date,
                            description: report.description,
                            status: report.status || "active"
                        }));
                    }
                }

                if (data.length === 0) {
                    data = sampleReports;
                }

                setReports(data);
                if (data.length > 0) {
                    setMapCenter(data[0].coordinates);
                    setMapZoom(6);
                }
            } catch (error) {
                console.error('Error loading reports:', error);
                setReports([]);
            }
        };

        fetchReports();

        const handleStorageChange = (e) => {
            if (e.key === 'adminReports' || e.key === 'userReports') {
                fetchReports();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const filteredReports = reports.filter(report => {
        if (crisisType !== "all" && report.type !== CrisisType) return false;
        if (severity !== "all" && report.severity !== severity) return false;
        if (searchQuery && !report.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const getMarkerColor = (type) => {
        switch (type) {
            case "flood":
                return "#3b82f6";
            case "earthquake":
                return "#f59e0b";
            case "forest_fire":
            case "industrial_fire":
                return "#ef4444";
            default:
                return "#10b981";
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col mb-6 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Crisis Map Overview</h2>
                    <p className="text-gray-600 text-sm sm:text-base">Visualizing {filteredReports.length} active Crisis reports</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={16} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                            placeholder="Search reports..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <div className="relative flex-1 sm:flex-none min-w-[120px]">
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

                        <div className="relative flex-1 sm:flex-none min-w-[120px]">
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


            <div className="bg-gray-50 p-2 sm:p-4 rounded-lg border border-gray-200 mb-6">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={{
                            width: '100%',
                            height: window.innerWidth < 640 ? '300px' : '400px'
                        }}
                        center={mapCenter}
                        zoom={mapZoom}
                        onLoad={onMapLoad}
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            mapTypeControlOptions: {
                                position: window.google?.maps?.ControlPosition?.TOP_RIGHT
                            }
                        }}
                    >
                        {filteredReports.map(report => (
                            <Marker
                                key={report.id}
                                position={report.coordinates}
                                icon={{
                                    path: window.google?.maps?.SymbolPath?.CIRCLE,
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
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg" style={mapContainerStyle}>
                        <p className="text-gray-500">Loading map...</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {filteredReports.slice(0, 3).map(report => (
                    <div
                        key={report.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                            setSelectedReport(report);
                            setMapCenter(report.coordinates);
                            setMapZoom(12);
                        }}
                    >
                        <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate mr-2">{report.title}</h3>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${report.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                        report.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                            'bg-blue-100 text-blue-800'
                                    }`}
                            >
                                {report.severity}
                            </span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2 truncate">
                            <MapPin size={12} className="mr-1 flex-shrink-0" />
                            <span className="truncate">{report.location}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 mb-3">{report.description}</p>
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