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
        image: null
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
                    <option value="seisme">Séisme</option>
                    <option value="inondation">Inondation</option>
                    <option value="feu_industriel">Feu Industriel</option>
                    <option value="feu_de_foret ">Feu de foret</option>
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
