import { useState } from "react";

    const AdminAlerts = () => {
    const [message, setMessage] = useState("");
    const [alerts, setAlerts] = useState([]);
    const sendAlert = () => {
        if (!message.trim()) return;
        setAlerts([...alerts, message]);
        setMessage("");
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Manage Alerts</h2>
            <div className="mb-4">
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Write an alert message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                    className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={sendAlert}
                >
                    Send Alert
                </button>
            </div>
            <h3 className="text-lg font-semibold mb-2">Sent Alerts</h3>
            <ul className="bg-white p-4 rounded shadow">
                {alerts.length === 0 ? (
                    <li className="text-gray-500">No alerts sent</li>
                ) : (
                    alerts.map((alert, index) => (
                        <li key={index} className="p-2 border-b">{alert}</li>
                    ))
                )}
            </ul>
        </div>
    );
};
export default AdminAlerts;