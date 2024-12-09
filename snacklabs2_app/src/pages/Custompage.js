import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SectionZone from '../components/Custompage/sectionZone/SectionZone';
import UpdatePart from '../components/Custompage/updatePart/UpdatePart';
import SectionPart from '../components/Custompage/sectionPart/SectionPart';
import menuData from '../data/menuData';
import './Custompage.css';

function Custompage() {
    const { department, group, model } = useParams();
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const sectionNavRef = useRef(null);

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
        // 섹션 네비게이션 스크롤 처리
        const container = sectionNavRef.current;
        if (container) {
            const element = container.querySelector(`[data-section="${section.title}"]`);
            if (element) {
                const containerRect = container.getBoundingClientRect();
                const elementRect = element.getBoundingClientRect();
                const scrollLeft = elementRect.left - containerRect.left - (containerRect.width / 2) + (elementRect.width / 2);

                container.scrollTo({
                    left: container.scrollLeft + scrollLeft,
                    behavior: 'smooth'
                });
            }
        }
    };

    if (!selectedSection) {
        return <div>Loading...</div>;
    }

    return (
        <div className="custom-page">
            <div className="left-container">
                <h2>{group} &gt; {model}</h2>
                <div className="section-zone">
                    <SectionZone
                        sections={sections}
                        selectedSection={selectedSection}
                        onSectionClick={handleSectionClick}
                        ref={sectionNavRef}
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

export default Custompage; 