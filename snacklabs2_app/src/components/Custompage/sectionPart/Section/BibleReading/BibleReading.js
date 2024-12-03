import React from 'react';
import './BibleReading.css';

function BibleReading({ data = {}, handleChange }) {
    const { bibleType = '', book = '', chapter = '', fromVerse = '', toVerse = '' } = data;

    const handleInputChange = (key, value) => {
        handleChange?.('bibleReading', key, value);
    };

    return (
        <div className="bible-reading-section">
            <h2>Bible Reading</h2>
            <div className="input-group">
                <label>Type of Bible:</label>
                <select
                    value={bibleType}
                    onChange={(e) => handleInputChange('bibleType', e.target.value)}
                >
                    <option value="">Select Bible Type</option>
                    <option value="NIV">NIV</option>
                    <option value="KJV">KJV</option>
                    <option value="ESV">ESV</option>
                </select>
            </div>
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
    );
}

export default BibleReading; 