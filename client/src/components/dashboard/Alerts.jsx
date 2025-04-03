import React from "react";

const Alerts = () => {
    const messages = [];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Alerts</h2>
            {messages.length === 0 ? (
                <p className="text-gray-500">No alerts at the moment.</p>
            ) : (
                <ul className="space-y-2">
                    {messages.map((msg, index) => (
                        <li key={index} className="bg-red-100 text-red-700 p-3 rounded">
                            {msg}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Alerts;
