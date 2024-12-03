import React from 'react';
import './ResponsiveReading.css';

function ResponsiveReading({ data = {}, handleChange }) {
    const { prayer = '', position = '', number = '' } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('responsiveReading', key, value);
    };

    return (
        <div className="responsive-reading-section">
            <h2>Responsive Reading</h2>
            <div className="input-group">
                <label>Prayer:</label>
                <input
                    type="text"
                    value={prayer}
                    onChange={(e) => handleInputChange('prayer', e.target.value)}
                    placeholder="Enter prayer"
                />
            </div>
            <div className="input-group">
                <label>Position:</label>
                <input
                    type="text"
                    value={position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Enter position"
                />
            </div>
            <div className="input-group">
                <label>Number:</label>
                <input
                    type="text"
                    value={number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    placeholder="Enter number"
                />
            </div>
        </div>
    );
}

export default ResponsiveReading; 