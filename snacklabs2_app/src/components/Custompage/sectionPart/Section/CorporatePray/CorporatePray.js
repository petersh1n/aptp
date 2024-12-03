import React from 'react';
import './CorporatePray.css';

function CorporatePray({ data = {}, handleChange }) {
    const { prayer = '', position = '' } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('corporatePray', key, value);
    };

    return (
        <div className="corporate-pray-section">
            <h2>Corporate Prayer</h2>
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
        </div>
    );
}

export default CorporatePray; 