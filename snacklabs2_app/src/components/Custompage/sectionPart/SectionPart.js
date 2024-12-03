// SectionPart.js
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SectionPart.css';

function SectionPart({ selectedSection }) {
    return (
        <div className="section-part">
            <TransitionGroup>
                <CSSTransition
                    key={selectedSection?.title}
                    timeout={300}
                    classNames="section-content"
                >
                    <div className="section-content">
                        {selectedSection?.component}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default SectionPart;