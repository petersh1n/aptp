// src/components/Section/LordPrayer/LordPrayer.js
import React from 'react';
import './LordPrayer.css';

function LordPrayer({ data = {}, handleChange }) {
    const { version = '' } = data;

    const handleVersionChange = (event) => {
        handleChange?.('lordPrayer', 'version', event.target.value);
    };

    return (
        <div className="lord-prayer-section">
            <h2>The Lord's Prayer</h2>
            <div className="input-group">
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

export default LordPrayer;