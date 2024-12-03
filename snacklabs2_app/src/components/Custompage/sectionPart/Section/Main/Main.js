// src/components/Section/Main/Main.js
import React from 'react';
import './Main.css';

function Main({ data = {}, handleChange }) {
    const { date = '', MainType = '' } = data;

    const handleDateChange = (event) => {
        handleChange?.('Main', 'date', event.target.value);
    };

    const handleMainTypeChange = (event) => {
        handleChange?.('Main', 'MainType', event.target.value);
    };

    return (
        <div className="Main-section">
            <h2>Main (Main Cover)</h2>
            <div className="input-group">
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </label>
            </div>
            <div className="input-group">
                <label>
                    Main Type:
                    <select value={MainType} onChange={handleMainTypeChange}>
                        <option value="">Select Type</option>
                        <option value="Cover">Cover</option>
                        <option value="Video">Video</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default Main;