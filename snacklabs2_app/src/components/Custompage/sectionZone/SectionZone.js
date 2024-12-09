// SectionZone.js (왼쪽 섹션 선택 영역)
import React from 'react';
import './SectionZone.css';

const SectionZone = React.forwardRef(({ sections, selectedSection, onSectionClick }, ref) => {
    const [showLeftButton, setShowLeftButton] = React.useState(false);
    const [showRightButton, setShowRightButton] = React.useState(false);

    const checkScroll = React.useCallback(() => {
        const container = ref.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setShowLeftButton(scrollLeft > 0);
            setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
        }
    }, [ref]);

    React.useEffect(() => {
        const container = ref.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            const resizeObserver = new ResizeObserver(checkScroll);
            resizeObserver.observe(container);

            return () => {
                container.removeEventListener('scroll', checkScroll);
                resizeObserver.disconnect();
            };
        }
    }, [checkScroll, sections, ref]);

    const scroll = (direction) => {
        const container = ref.current;
        const scrollAmount = 200;
        container.scrollBy({
            left: direction === 'right' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    };

    return (
        <div className="section-nav-container">
            {showLeftButton && (
                <button className="scroll-button left" onClick={() => scroll('left')}>
                    &#8249;
                </button>
            )}

            <nav className="section-nav" ref={ref}>
                <ul className="section-list">
                    {sections.map((section) => (
                        <li
                            key={section.title}
                            data-section={section.title}
                            className={`section-item ${selectedSection?.title === section.title ? 'active' : ''}`}
                            onClick={() => onSectionClick(section)}
                        >
                            {section.title}
                        </li>
                    ))}
                </ul>
            </nav>

            {showRightButton && (
                <button className="scroll-button right" onClick={() => scroll('right')}>
                    &#8250;
                </button>
            )}
        </div>
    );
});

export default SectionZone;