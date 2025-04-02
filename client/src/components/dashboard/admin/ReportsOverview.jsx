import { useState, useEffect } from "react";

const ReportsOverview = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const data = [
                { id: 1, title: "Flood in City X", status: "Pending", location: "City X" },
                { id: 2, title: "Fire in Region Y", status: "Reviewed", location: "Region Y" }
            ];
            setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Reports Overview</h2>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                <tr className="bg-gray-200 text-left">
                    <th className="p-2">Title</th>
                    <th className="p-2">Location</th>
                    <th className="p-2">Status</th>
                </tr>
                </thead>
                <tbody>
                {reports.length === 0 ? (
                    <tr>
                        <td colSpan="3" className="text-center p-4">No reports available</td>
                    </tr>
                ) : (
                    reports.map(report => (
                        <tr key={report.id} className="border-b">
                            <td className="p-2">{report.title}</td>
                            <td className="p-2">{report.location}</td>
                            <td className="p-2">{report.status}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsOverview;