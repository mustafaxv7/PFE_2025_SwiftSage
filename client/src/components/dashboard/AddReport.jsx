import { useState, useCallback, useRef } from "react";
import { MapPin, Upload, AlertTriangle, Search, X } from "lucide-react";
import { GoogleMap, Marker, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';

const AddReport = () => {
    // Initial state for resetting the form
    const initialReportData = {
        lat: "",
        lng: "",
        altitude: "",
        amplitude: "",
        title: "",
        description: "",
        crisisType: "",
        image: null,
    };

    const initialReportDetailsData = {
        spreadRate: undefined,
        roadStatus: undefined,
        injuredNumber: undefined,
        bleedingNumber: undefined,
        threatenedStructures: undefined,
        containmentPercent: undefined,
        burntArea: undefined,
        institutionType: undefined,
        evacuated: undefined,
    };

    const initialAdditionalData = {
        throttled: undefined,
        burnt: undefined,
        fractions: undefined,
        missing: undefined,
        trapped: undefined,
        submergedDwelling: undefined,
        electrification: undefined,
        explosion: undefined,
    };

    // Reports table data
    const [reportData, setReportData] = useState(initialReportData);
    // Report_details table data
    const [reportDetailsData, setReportDetailsData] = useState(initialReportDetailsData);
    // Additional data that might need special handling
    const [additionalData, setAdditionalData] = useState(initialAdditionalData);

    const formData = {
        ...reportData,
        ...reportDetailsData,
        ...additionalData
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in reportData) {
            setReportData(prev => ({ ...prev, [name]: value }));
        } else if (name in reportDetailsData) {
            setReportDetailsData(prev => ({ ...prev, [name]: value }));
        } else if (name in additionalData) {
            setAdditionalData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {

            if (!file.type.match('image.*')) {
                alert('Please select an image file (PNG, JPG, GIF)');
                return;
            }

            if (file.size > 10 * 1024 * 1024) {
                alert('File size exceeds 10MB limit');
                return;
            }

            setReportData(prev => ({ ...prev, image: file }));
            console.log('Image selected:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
        }
    };

    const getImagePreview = () => {
        if (!reportData.image) return null;

        return (
            <div className="mt-2 relative">
                <img
                    src={URL.createObjectURL(reportData.image)}
                    alt="Preview"
                    className="h-32 w-auto rounded-md object-cover"
                />
                <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    onClick={() => setReportData(prev => ({ ...prev, image: null }))}
                >
                    <X size={16} />
                </button>
                <p className="text-sm text-gray-500 mt-1">{reportData.image.name}</p>
            </div>
        );
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
                return <AlertTriangle className="text-yellow-500" />;
        }
    };

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

    const [autocomplete, setAutocomplete] = useState(null);
    const searchInputRef = useRef(null);

    const [map, setMap] = useState(null);
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const center = {
        lat: reportData.lat ? parseFloat(reportData.lat) : 36.7538,
        lng: reportData.lng ? parseFloat(reportData.lng) : 3.0588
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleMapClick = (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setReportData(prev => ({
            ...prev,
            lat: lat.toFixed(6),
            lng: lng.toFixed(6)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reportData.title || !reportData.description || !reportData.crisisType || !reportData.lat || !reportData.lng) {
            alert("Please fill in all required fields (title, description, crisis type, and location)");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in to submit a report");
                return;
            }

            // Extract user ID from JWT token
            // JWT token is in format: header.payload.signature
            // We need to decode the payload part
            let userId;
            try {
                const payload = token.split('.')[1];
                const decodedPayload = JSON.parse(atob(payload));
                userId = decodedPayload.id;
                console.log('Extracted user ID:', userId);
            } catch (error) {
                console.error('Error extracting user ID from token:', error);
                alert("Authentication error. Please log in again.");
                return;
            }

            if (!userId) {
                alert("User ID not found. Please log in again.");
                return;
            }

            const formDataToSend = new FormData();

            const reportDataWithUserId = {
                ...reportData,
                userId: userId
            };

            formDataToSend.append('reportData', JSON.stringify(reportDataWithUserId));
            formDataToSend.append('reportDetailsData', JSON.stringify(reportDetailsData));
            formDataToSend.append('additionalData', JSON.stringify(additionalData));

            if (reportData.image) {
                try {
                    formDataToSend.append('image', reportData.image);
                    console.log('Image attached:', reportData.image.name, 'Size:', (reportData.image.size / 1024 / 1024).toFixed(2), 'MB');
                } catch (error) {
                    console.error('Error attaching image:', error);
                    alert("Error attaching image. Please try again with a different image.");
                    return;
                }
            }

            console.log('Submitting report with data:', {
                reportData: reportDataWithUserId,
                reportDetailsData,
                additionalData,
                hasImage: !!reportData.image
            });

            try {
                const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
                console.log('Sending request to:', `${baseURL}/api/reports`);

                const response = await axios.post(`${baseURL}/api/reports`, formDataToSend, {
                    headers: {

                        'Authorization': `Bearer ${token}`
                    },
                    timeout: 30000,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        console.log(`Upload progress: ${percentCompleted}%`);
                    }
                });

                console.log('Report submitted successfully to API:', response.data);

                setReportData(initialReportData);
                setReportDetailsData(initialReportDetailsData);
                setAdditionalData(initialAdditionalData);

                alert("Report submitted successfully!");

            } catch (error) {
                console.error('Error submitting report to API:', error);

                if (error.code === 'ECONNABORTED') {
                    alert("Request timed out. The server might be down or the image might be too large.");
                } else if (error.response) {
                    const errorMessage = error.response.data?.error || error.response.statusText || 'Unknown error';
                    alert(`Server error (${error.response.status}): ${errorMessage}`);
                } else if (error.request) {
                    alert("No response from server. Please check your internet connection and try again.");
                } else {
                    alert("Error submitting report: " + error.message);
                }
            }

        } catch (error) {
            console.error('Error submitting report:', error);
            alert("Error submitting report. Please try again.");
        }
    };

    const handleCancel = () => {
        setReportData(initialReportData);
        setReportDetailsData(initialReportDetailsData);
        setAdditionalData(initialAdditionalData);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <AlertTriangle className="mr-2 text-red-500" size={24} />
                    Add New Crisis Report
                </h2>
                <p className="text-gray-600 mt-1">Provide detailed information about the crisis situation</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="p-6">
                    <div className="w-full h-64 bg-gray-100 rounded-lg mb-6 overflow-hidden">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 h-full">
                            {isLoaded ? (
                                <GoogleMap
                                    mapContainerStyle={containerStyle}
                                    center={center}
                                    zoom={6}
                                    onClick={handleMapClick}
                                    onLoad={onLoad}
                                    onUnmount={onUnmount}
                                    options={{
                                        streetViewControl: false,
                                        mapTypeControl: false,
                                        fullscreenControl: false,
                                        mapTypeControlOptions: {
                                            position: window.google?.maps?.ControlPosition?.TOP_RIGHT
                                        }
                                    }}
                                >
                                    {(reportData.lat && reportData.lng) && (
                                        <Marker
                                            position={{
                                                lat: parseFloat(reportData.lat),
                                                lng: parseFloat(reportData.lng)
                                            }}
                                            icon={{
                                                path: window.google?.maps?.SymbolPath?.CIRCLE,
                                                fillColor: getMarkerColor(reportData.crisisType || 'default'),
                                                fillOpacity: 1,
                                                strokeWeight: 0,
                                                scale: 8
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100 rounded-lg" style={containerStyle}>
                                    <div className="text-center">
                                        <MapPin size={32} className="mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-500">Loading map...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                            <input
                                type="text"
                                name="lat"
                                placeholder="Latitude"
                                className="w-full p-2 rounded-md border border-gray-300 "
                                value={formData.lat}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                            <input
                                type="text"
                                name="lng"
                                placeholder="Longitude"
                                className="w-full p-2 rounded-md border border-gray-300  "
                                value={formData.lng}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Brief title describing the crisis"
                            className="w-full p-2 rounded-md border border-gray-300 "
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                        <textarea
                            name="description"
                            placeholder="Provide a detailed description of the situation..."
                            className="w-full p-2 rounded-md border border-gray-300  h-32"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Crisis Type</label>
                        <select
                            name="crisisType"
                            value={formData.crisisType}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md border border-gray-300 "
                        >
                            <option value="">Select Crisis Type</option>
                            <option value="earthquake">Earthquake</option>
                            <option value="flood">Flood</option>
                            <option value="industrial_fire">Industrial Fire</option>
                            <option value="forest_fire">Forest Fire</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Evidence</label>
                        <div
                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                            <div className="space-y-1 text-center">
                                {!reportData.image && (
                                    <>
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1} />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500">
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </>
                                )}
                                {reportData.image && getImagePreview()}
                            </div>
                        </div>
                    </div>

                    {formData.crisisType && (
                        <div className="mt-6 p-6 border rounded-md bg-gray-50">
                            <h3 className="font-semibold text-lg mb-4 flex items-center">
                                <span className="mr-2 text-xl">{getCrisisTypeIcon(formData.crisisType)}</span>
                                {formData.crisisType.replace('_', ' ').charAt(0).toUpperCase() + formData.crisisType.replace('_', ' ').slice(1)} Details
                            </h3>
                            {formData.crisisType === "earthquake" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Road Status</label>
                                        <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Road Status</option>
                                            <option value="clear">Clear</option>
                                            <option value="blocked">Blocked</option>
                                            <option value="partially_blocked">Partially Blocked</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Injured
                                            People</label>
                                        <input type="number" name="injuredNumber" value={formData.injuredNumber || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bleeding
                                            People</label>
                                        <input type="number" name="bleedingNumber" value={formData.bleedingNumber || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Throttled</label>
                                        <input type="number" name="throttled" value={formData.throttled || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Burnt
                                            Structures</label>
                                        <input type="number" name="burnt" value={formData.burnt || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fractures</label>
                                        <input type="number" name="fractions" value={formData.fractions || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Electrification
                                            Status</label>
                                        <select name="electrification" value={formData.electrification || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="partial">Partial</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {formData.crisisType === "flood" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Road Status</label>
                                        <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Road Status</option>
                                            <option value="clear">Clear</option>
                                            <option value="flooded">Flooded</option>
                                            <option value="partially_flooded">Partially Flooded</option>
                                            <option value="inaccessible">Inaccessible</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Missing
                                            Persons</label>
                                        <input type="number" name="missing" value={formData.missing || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Trapped
                                            Persons</label>
                                        <input type="number" name="trapped" value={formData.trapped || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Submerged
                                            Dwellings</label>
                                        <input type="number" name="submergedDwelling"
                                            value={formData.submergedDwelling || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Electrification
                                            Status</label>
                                        <select name="electrification" value={formData.electrification || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="partial">Partial</option>
                                            <option value="dangerous">Dangerous</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {formData.crisisType === "industrial_fire" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Burnt Area (sq
                                            m)</label>
                                        <input type="number" name="burnt" value={formData.burnt || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Road Status</label>
                                        <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Road Status</option>
                                            <option value="clear">Clear</option>
                                            <option value="blocked">Blocked</option>
                                            <option value="hazardous">Hazardous</option>
                                            <option value="smoke_covered">Smoke Covered</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Explosion
                                            Risk</label>
                                        <select name="explosion" value={formData.explosion || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Status</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                            <option value="potential">Potential Risk</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type of
                                            Institution</label>
                                        <select name="institutionType" value={formData.institutionType || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Type</option>
                                            <option value="factory">Factory</option>
                                            <option value="warehouse">Warehouse</option>
                                            <option value="chemical_plant">Chemical Plant</option>
                                            <option value="refinery">Refinery</option>
                                            <option value="power_plant">Power Plant</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Trapped
                                            Persons</label>
                                        <input type="number" name="trapped" value={formData.trapped || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Electrification
                                            Status</label>
                                        <select name="electrification" value={formData.electrification || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="dangerous">Dangerous</option>
                                            <option value="unknown">Unknown</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                            {formData.crisisType === "forest_fire" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Road Status</label>
                                        <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Road Status</option>
                                            <option value="clear">Clear</option>
                                            <option value="blocked">Blocked</option>
                                            <option value="smoke_covered">Smoke Covered</option>
                                            <option value="inaccessible">Inaccessible</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Burnt Area
                                            (hectares)</label>
                                        <input type="number" name="burntArea" value={formData.burntArea || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Fire Spread
                                            Rate</label>
                                        <select name="spreadRate" value={formData.spreadRate || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300">
                                            <option value="">Select Rate</option>
                                            <option value="slow">Slow</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="rapid">Rapid</option>
                                            <option value="extreme">Extreme</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Evacuated
                                            Persons</label>
                                        <input type="number" name="evacuated" value={formData.evacuated || ''}
                                            onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Threatened
                                            Structures</label>
                                        <input type="number" name="threatenedStructures"
                                            value={formData.threatenedStructures || ''} onChange={handleChange}
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Containment
                                            Percentage</label>
                                        <input type="number" name="containmentPercent"
                                            value={formData.containmentPercent || ''}
                                            onChange={handleChange} min="0" max="100"
                                            className="w-full p-2 rounded-md border border-gray-300" />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Submit Report
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddReport;