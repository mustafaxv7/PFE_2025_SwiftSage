import { useState, useEffect, useRef } from "react";

const AddReport = () => {
    const [formData, setFormData] = useState({
        lat: "",
        lng: "",
        altitude: "",
        amplitude: "",
        title: "",
        description: "",
        crisisType: "",
        image: null
    });

    // Reference to the map container
    const mapRef = useRef(null);
    // Reference to the map instance
    const mapInstance = useRef(null);
    // Reference to the marker
    const markerRef = useRef(null);

    useEffect(() => {
        // Initialize the map only once when the component mounts
        if (mapRef.current && !mapInstance.current) {
            // Create map instance
            mapInstance.current = L.map(mapRef.current).setView([51.505, -0.09], 13);
            
            // Add tile layer (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance.current);

            // Add click event to the map
            mapInstance.current.on('click', (e) => {
                const { lat, lng } = e.latlng;
                setFormData(prev => ({
                    ...prev,
                    lat: lat.toString(),
                    lng: lng.toString()
                }));

                // Remove existing marker if any
                if (markerRef.current) {
                    mapInstance.current.removeLayer(markerRef.current);
                }

                // Add new marker
                markerRef.current = L.marker([lat, lng]).addTo(mapInstance.current)
                    .bindPopup(`Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`).openPopup();
            });
        }

        // Cleanup function to remove the map when component unmounts
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

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
            <div className="w-full h-100 bg-gray-300 flex items-center justify-center">
                {/* Map container - must have a defined height */}
                <div 
                    id="map"
                    ref={mapRef}
                    style={{ height: "400px", width: "100%" }}
                ></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
                <input
                    type="text"
                    name="altitude"
                    placeholder="Altitude"
                    className="w-full p-2 border"
                    value={formData.lat}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="amplitude"
                    placeholder="Amplitude"
                    className="w-full p-2 border"
                    value={formData.lng}
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
                    <option value="seisme">Séisme</option>
                    <option value="inondation">Inondation</option>
                    <option value="feu_industriel">Feu Industriel</option>
                    <option value="feu_de_foret">Feu de foret</option>
                </select>
            </div>
            <div className="mt-4 p-4 border border-dashed text-gray-500">
                <p>📊 Result of crisis type analysis (To be implemented)</p>
            </div>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">
                Submit Report
            </button>
        </div>
    );
};

export default AddReport;