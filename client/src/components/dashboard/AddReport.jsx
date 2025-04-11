import {useState} from "react";
import {MapPin, Upload, AlertTriangle} from "lucide-react";

const AddReport = () => {
    const [formData, setFormData] = useState({
        lat: "",
        lng: "",
        altitude: "",
        amplitude: "",
        title: "",
        description: "",
        crisisType: "",
        image: null,
        spreadRate: undefined,
        roadStatus: undefined,
        injuredNumber: undefined,
        bleedingNumber: undefined,
        throttled: undefined,
        burnt: undefined,
        fractions: undefined,
        missing: undefined,
        trapped: undefined,
        submergedDwelling: undefined,
        electrification: undefined,
        explosion: undefined,
        institutionType: undefined,
        evacuated: undefined,
        threatenedStructures: undefined,
        containmentPercent: undefined,
        burntArea: undefined
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setFormData({...formData, image: file});
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
                return <AlertTriangle className="text-yellow-500"/>;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <AlertTriangle className="mr-2 text-red-500" size={24}/>
                    Add New Crisis Report
                </h2>
                <p className="text-gray-600 mt-1">Provide detailed information about the crisis situation</p>
            </div>
            <div className="p-6">
                <div
                    className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-6 border border-dashed border-gray-300">
                    <div className="text-center">
                        <MapPin size={32} className="mx-auto text-gray-400 mb-2"/>
                        <p className="text-gray-500">Interactive Map</p>
                        <p className="text-sm text-gray-400">Click to select location</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                        <input
                            type="text"
                            name="lat"
                            placeholder="Latitude"
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={formData.lng}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Altitude</label>
                        <input
                            type="text"
                            name="altitude"
                            placeholder="Altitude"
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={formData.altitude}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amplitude</label>
                        <input
                            type="text"
                            name="amplitude"
                            placeholder="Amplitude"
                            className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            value={formData.amplitude}
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
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                    <textarea
                        name="description"
                        placeholder="Provide a detailed description of the situation..."
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 h-32"
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
                        className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                            <Upload className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1}/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bleeding
                                        People</label>
                                    <input type="number" name="bleedingNumber" value={formData.bleedingNumber || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Throttled</label>
                                    <input type="number" name="throttled" value={formData.throttled || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Burnt
                                        Structures</label>
                                    <input type="number" name="burnt" value={formData.burnt || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fractures</label>
                                    <input type="number" name="fractions" value={formData.fractions || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Trapped
                                        Persons</label>
                                    <input type="number" name="trapped" value={formData.trapped || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Submerged
                                        Dwellings</label>
                                    <input type="number" name="submergedDwelling"
                                           value={formData.submergedDwelling || ''}
                                           onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
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
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Threatened
                                        Structures</label>
                                    <input type="number" name="threatenedStructures"
                                           value={formData.threatenedStructures || ''} onChange={handleChange}
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Containment
                                        Percentage</label>
                                    <input type="number" name="containmentPercent"
                                           value={formData.containmentPercent || ''}
                                           onChange={handleChange} min="0" max="100"
                                           className="w-full p-2 rounded-md border border-gray-300"/>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                <button
                    className="px-8 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition shadow-sm focus:ring-4 focus:ring-red-200">
                    Submit Report
                </button>
            </div>
        </div>
    );
};

export default AddReport;