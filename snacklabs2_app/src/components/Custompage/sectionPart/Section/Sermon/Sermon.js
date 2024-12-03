import React from 'react';
import './Sermon.css';

function Sermon({ data = {}, handleChange }) {
    const {
        prayer = '',
        position = '',
        book = '',
        chapter = '',
        fromVerse = '',
        toVerse = '',
        hasPPT = false
    } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('sermon', key, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleInputChange('pptFile', file);
    };

    return (
        <div className="sermon-section">
            <h2>Sermon</h2>
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
            <div className="bible-section">
                <h3>Bible Verse</h3>
                <div className="input-group">
                    <label>Book:</label>
                    <select
                        value={book}
                        onChange={(e) => handleInputChange('book', e.target.value)}
                    >
                        <option value="">Select Book</option>
                        <option value="Genesis">Genesis</option>
                        <option value="Exodus">Exodus</option>
                        {/* Add more books */}
                    </select>
                </div>
                <div className="input-group">
                    <label>Chapter:</label>
                    <input
                        type="number"
                        value={chapter}
                        onChange={(e) => handleInputChange('chapter', e.target.value)}
                        placeholder="Enter chapter"
                    />
                </div>
                <div className="verse-range">
                    <div className="input-group">
                        <label>From Verse:</label>
                        <input
                            type="number"
                            value={fromVerse}
                            onChange={(e) => handleInputChange('fromVerse', e.target.value)}
                            placeholder="Start verse"
                        />
                    </div>
                    <div className="input-group">
                        <label>To Verse:</label>
                        <input
                            type="number"
                            value={toVerse}
                            onChange={(e) => handleInputChange('toVerse', e.target.value)}
                            placeholder="End verse"
                        />
                    </div>
                </div>
            </div>
            <div className="input-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={hasPPT}
                        onChange={(e) => handleInputChange('hasPPT', e.target.checked)}
                    />
                    Include PPT
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

export default Sermon; 