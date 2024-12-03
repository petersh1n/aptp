import React from 'react';
import './Announcement.css';

function Announcement({ data = {}, handleChange }) {
    const {
        representative = '',
        position = '',
        hasPPT = false
    } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('announcement', key, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleInputChange('pptFile', file);
    };

    return (
        <div className="announcement-section">
            <h2>Announcement</h2>
            <div className="input-group">
                <label>Representative:</label>
                <input
                    type="text"
                    value={representative}
                    onChange={(e) => handleInputChange('representative', e.target.value)}
                    placeholder="Enter representative name"
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
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={hasPPT}
                        onChange={(e) => handleInputChange('hasPPT', e.target.checked)}
                    />
                    Include Announcement PPT
                </label>
            </div>
            {hasPPT && (
                <div className="input-group">
                    <label>PPT File:</label>
                    <input
                        type="file"
                        accept=".ppt,.pptx"
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </div>
    );
}

export default Announcement; 