// src/components/Section/Praise/Praise.js
import React from 'react';
import './Praise.css';

function Praise({ data = {}, handleChange }) {
    const {
        type = '',
        worshipTeam = '',
        songTitle = '',
        songArtist = ''
    } = data;

    const onInputChange = (key, value) => {
        handleChange?.('praise', key, value);
    };

    return (
        <div className="praise-section">
            <h2>Praise Section</h2>
            <div className="input-group">
                <label>Type of Praise:</label>
                <select
                    value={type}
                    onChange={(e) => onInputChange('type', e.target.value)}
                >
                    <option value="">Select Type</option>
                    <option value="Opening">Opening</option>
                    <option value="Hymn">Hymn</option>
                    <option value="WorshipPraise">Worship Praise</option>
                    <option value="AfterSermonPraise">After Sermon Praise</option>
                </select>
            </div>

            <div className="input-group">
                <label>Worship Team:</label>
                <select
                    value={worshipTeam}
                    onChange={(e) => onInputChange('worshipTeam', e.target.value)}
                >
                    <option value="">Select Team</option>
                    <option value="Remain">Remain</option>
                    <option value="etc">Other</option>
                </select>
            </div>

            <div className="input-group">
                <label>Song Title:</label>
                <input
                    type="text"
                    value={songTitle}
                    onChange={(e) => onInputChange('songTitle', e.target.value)}
                    placeholder="Enter song title"
                />
            </div>

            <div className="input-group">
                <label>Song Artist:</label>
                <input
                    type="text"
                    value={songArtist}
                    onChange={(e) => onInputChange('songArtist', e.target.value)}
                    placeholder="Enter artist name"
                />
            </div>
        </div>
    );
}

export default Praise;