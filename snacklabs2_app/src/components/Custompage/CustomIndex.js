import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SectionZone from './sectionZone/SectionZone';
import UpdatePart from './updatePart/UpdatePart';
import SectionPart from './sectionPart/SectionPart';
import menuData from '../Menu/menuData';
import './CustomIndex.css';

function CustomIndex() {
    const { department, group, model } = useParams();
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        const findSections = () => {
            const departmentItem = menuData.find(item =>
                item.title === "Department"
            );

            if (!departmentItem) return [];

            const groupItem = departmentItem.subItems.find(item =>
                item.title === group
            );

            if (!groupItem) return [];

            const modelItem = groupItem.models.find(item =>
                item.title === model
            );

            return modelItem?.sections || [];
        };

        const currentSections = findSections();
        setSections(currentSections);
        setSelectedSection(currentSections[0]);
    }, [department, group, model]);

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    if (!selectedSection) {
        return <div>Loading...</div>;
    }

    return (
        <div className="custom-page">
            <div className="left-container">
                <div className="section-zone">
                    <SectionZone
                        sections={sections}
                        selectedSection={selectedSection}
                        onSectionClick={handleSectionClick}
                    />
                </div>
                <UpdatePart
                    sections={sections}
                    selectedSection={selectedSection}
                    onSectionClick={handleSectionClick}
                />
            </div>
            <div className="section-container">
                <SectionPart selectedSection={selectedSection} />
            </div>
        </div>
    );
}

export default CustomIndex;