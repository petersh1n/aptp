// src/components/Section/ApostlesCreed/ApostlesCreed.js
import React from 'react';
import './ApostlesCreed.css';

function ApostlesCreed({ data, handleChange }) {
    const { version } = data;

    const handleVersionChange = (event) => {
        handleChange('apostlesCreed', 'version', event.target.value);
    };

    return (
        <div className="apostles-creed-section">
            <h2>The Apostles' Creed</h2>
            <div>
                <label>
                    Select Version:
                    <select value={version} onChange={handleVersionChange}>
                        <option value="">Select Version</option>
                        <option value="Old">Old version</option>
                        <option value="New">New version</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default ApostlesCreed;