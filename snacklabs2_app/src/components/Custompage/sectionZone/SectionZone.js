// SectionZone.js (왼쪽 섹션 선택 영역)
import React from 'react';
import './SectionZone.css';

function SectionZone({ sections, selectedSection, onSectionClick }) {
    return (
        <nav className="section-nav">
            <ul className="section-list">
                {sections.map((section) => (
                    <li
                        key={section.title}
                        className={`section-item ${selectedSection?.title === section.title ? 'active' : ''}`}
                        onClick={() => onSectionClick(section)}
                    >
                        {section.title}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SectionZone;