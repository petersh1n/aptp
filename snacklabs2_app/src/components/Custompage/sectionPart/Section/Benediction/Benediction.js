import React from 'react';
import './Benediction.css';

function Benediction({ data = {}, handleChange }) {
    const { prayer = '', position = '' } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('benediction', key, value);
    };

    return (
        <div className="benediction-section">
            <h2>Benediction</h2>
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

export default Benediction; 