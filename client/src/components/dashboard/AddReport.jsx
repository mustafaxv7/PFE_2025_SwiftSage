import {useState} from "react";

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

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add a New Report</h2>
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center">
                [Map Goes Here]
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <input
                    type="text"
                    name="altitude"
                    placeholder="Altitude"
                    className="w-full p-2 border"
                    value={formData.altitude}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="amplitude"
                    placeholder="Amplitude"
                    className="w-full p-2 border"
                    value={formData.amplitude}
                    onChange={handleChange}
                />
            </div>
            <input
                type="text"
                name="title"
                placeholder="Title"
                className="w-full p-2 border mt-3"
                value={formData.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Description"
                className="w-full p-2 border mt-3"
                value={formData.description}
                onChange={handleChange}
            ></textarea>
            <div className="mt-3">
                <label className="block text-gray-700">Upload an Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 p-2 border w-full"
                />
            </div>
            <div className="mt-3">
                <label className="block text-gray-700">Crisis Type:</label>
                <select
                    name="crisisType"
                    value={formData.crisisType}
                    onChange={handleChange}
                    className="w-full p-2 border mt-1"
                >
                    <option value="">Select Crisis Type</option>
                    <option value="earthquake">Earthquake</option>
                    <option value="flood">Flood</option>
                    <option value="industrial_fire">Industrial fire</option>
                    <option value="forest_fire">Forest fire</option>
                </select>
            </div>

            {formData.crisisType && (
                <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <h3 className="font-medium text-lg mb-3">Details for {formData.crisisType.replace('_', ' ')}</h3>

                    {formData.crisisType === "earthquake" && (
                        <>
                            <div className="mt-3">
                                <label className="block text-gray-700">Road Status:</label>
                                <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Road Status</option>
                                    <option value="clear">Clear</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="partially_blocked">Partially Blocked</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Injured Number:</label>
                                <input type="number" name="injuredNumber" value={formData.injuredNumber || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Bleeding Number:</label>
                                <input type="number" name="bleedingNumber" value={formData.bleedingNumber || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Throttled:</label>
                                <input type="number" name="throttled" value={formData.throttled || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Burnt:</label>
                                <input type="number" name="burnt" value={formData.burnt || ''} onChange={handleChange}
                                       className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Fractions:</label>
                                <input type="number" name="fractions" value={formData.fractions || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Electrification Status:</label>
                                <select name="electrification" value={formData.electrification || ''}
                                        onChange={handleChange} className="w-full p-2 border mt-1">
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="partial">Partial</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                            </div>
                        </>
                    )}

                    {formData.crisisType === "flood" && (
                        <>
                            <div className="mt-3">
                                <label className="block text-gray-700">Road Status:</label>
                                <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Road Status</option>
                                    <option value="clear">Clear</option>
                                    <option value="flooded">Flooded</option>
                                    <option value="partially_flooded">Partially Flooded</option>
                                    <option value="inaccessible">Inaccessible</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Missing Persons:</label>
                                <input type="number" name="missing" value={formData.missing || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Trapped Persons:</label>
                                <input type="number" name="trapped" value={formData.trapped || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Submerged Dwellings:</label>
                                <input type="number" name="submergedDwelling" value={formData.submergedDwelling || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Electrification Status:</label>
                                <select name="electrification" value={formData.electrification || ''}
                                        onChange={handleChange} className="w-full p-2 border mt-1">
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="partial">Partial</option>
                                    <option value="dangerous">Dangerous</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                            </div>
                        </>
                    )}

                    {formData.crisisType === "industrial_fire" && (
                        <>
                            <div className="mt-3">
                                <label className="block text-gray-700">Burnt Area (sq m):</label>
                                <input type="number" name="burnt" value={formData.burnt || ''} onChange={handleChange}
                                       className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Road Status:</label>
                                <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Road Status</option>
                                    <option value="clear">Clear</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="hazardous">Hazardous</option>
                                    <option value="smoke_covered">Smoke Covered</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Explosion:</label>
                                <select name="explosion" value={formData.explosion || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Status</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="potential">Potential Risk</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Type of Institution:</label>
                                <select name="institutionType" value={formData.institutionType || ''}
                                        onChange={handleChange} className="w-full p-2 border mt-1">
                                    <option value="">Select Type</option>
                                    <option value="factory">Factory</option>
                                    <option value="warehouse">Warehouse</option>
                                    <option value="chemical_plant">Chemical Plant</option>
                                    <option value="refinery">Refinery</option>
                                    <option value="power_plant">Power Plant</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Trapped Persons:</label>
                                <input type="number" name="trapped" value={formData.trapped || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Electrification Status:</label>
                                <select name="electrification" value={formData.electrification || ''}
                                        onChange={handleChange} className="w-full p-2 border mt-1">
                                    <option value="">Select Status</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="dangerous">Dangerous</option>
                                    <option value="unknown">Unknown</option>
                                </select>
                            </div>
                        </>
                    )}

                    {formData.crisisType === "forest_fire" && (
                        <>
                            <div className="mt-3">
                                <label className="block text-gray-700">Road Status:</label>
                                <select name="roadStatus" value={formData.roadStatus || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Road Status</option>
                                    <option value="clear">Clear</option>
                                    <option value="blocked">Blocked</option>
                                    <option value="smoke_covered">Smoke Covered</option>
                                    <option value="inaccessible">Inaccessible</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Burnt Area (hectares):</label>
                                <input type="number" name="burntArea" value={formData.burntArea || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Fire Spread Rate:</label>
                                <select name="spreadRate" value={formData.spreadRate || ''} onChange={handleChange}
                                        className="w-full p-2 border mt-1">
                                    <option value="">Select Rate</option>
                                    <option value="slow">Slow</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="rapid">Rapid</option>
                                    <option value="extreme">Extreme</option>
                                </select>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Evacuated Persons:</label>
                                <input type="number" name="evacuated" value={formData.evacuated || ''}
                                       onChange={handleChange} className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Threatened Structures:</label>
                                <input type="number" name="threatenedStructures"
                                       value={formData.threatenedStructures || ''} onChange={handleChange}
                                       className="w-full p-2 border mt-1"/>
                            </div>

                            <div className="mt-3">
                                <label className="block text-gray-700">Containment Percentage:</label>
                                <input type="number" name="containmentPercent" value={formData.containmentPercent || ''}
                                       onChange={handleChange} min="0" max="100" className="w-full p-2 border mt-1"/>
                            </div>
                        </>
                    )}
                </div>
            )}

            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">
                Submit Report
            </button>
        </div>
    );
};

export default AddReport;