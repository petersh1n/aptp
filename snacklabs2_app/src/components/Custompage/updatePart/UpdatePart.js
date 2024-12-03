import React from 'react';
import './UpdatePart.css';

function UpdatePart({ sections, selectedSection, onSectionClick }) {
    return (
        <div className="update-part">
            <div className="section-list-zone">
                <h3>Section List Zone</h3>
                <div className="zone-content">
                    <ul className="section-folder-list">
                        {sections.map((section) => (
                            <li
                                key={section.title}
                                className={`section-folder-item ${selectedSection?.title === section.title ? 'active' : ''}`}
                                onClick={() => onSectionClick(section)}
                            >
                                {section.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="information-zone">
                <h3>Information Zone</h3>
                <div className="zone-content">
                    {selectedSection?.information ? (
                        <div className="information-content">
                            {selectedSection.information}
                        </div>
                    ) : (
                        <p className="placeholder-text">선택된 섹션의 정보가 여기에 표시됩니다</p>
                    )}
                </div>
            </div>

            <div className="representative-zone">
                <h3>Representative Zone</h3>
                <div className="zone-content">
                    {selectedSection?.representative ? (
                        <div className="representative-content">
                            {selectedSection.representative}
                        </div>
                    ) : (
                        <div className="representative-content">다같이</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UpdatePart;