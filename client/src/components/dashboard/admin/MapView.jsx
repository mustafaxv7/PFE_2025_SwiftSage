import { useEffect, useState } from "react";

const MapView = () => {
    const [reports, setReports] = useState([]);
    useEffect(() => {
        const fetchReports = async () => {
            const data = [
                { id: 1, location: "City X", severity: "high" },
                { id: 2, location: "Region Y", severity: "medium" }
            ];
            setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Crisis Map</h2>
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Map integration coming soon...</p>
            </div>
        </div>
    );
};

export default MapView;