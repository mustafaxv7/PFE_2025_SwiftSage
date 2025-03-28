const MyReports = () => {
    const reports = [
        { id: 1, title: "Flood in Nairobi", date: "March 10, 2025" },
        { id: 2, title: "Earthquake in Mexico", date: "March 15, 2025" }
    ];

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">My Reports</h2>

            <ul>
                {reports.map(report => (
                    <li key={report.id} className="p-3 border-b">
                        <strong>{report.title}</strong> - {report.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyReports;
