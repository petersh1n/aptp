import React from 'react';
import './OfferingTime.css';

function OfferingTime({ data = {}, handleChange }) {
    const { song = '', prayer = '', position = '' } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('offeringTime', key, value);
    };

    return (
        <div className="offering-time-section">
            <h2>Offering Time</h2>
            <div className="input-group">
                <label>Song:</label>
                <input
                    type="text"
                    value={song}
                    onChange={(e) => handleInputChange('song', e.target.value)}
                    placeholder="Enter song title"
                />
            </div>
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

export default OfferingTime; 