import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import menuData from './menuData'; // 메뉴 데이터 파일

import './Menu.css';

function Menu({ isOpen, onClose }) {
    const [selectedMenu, setSelectedMenu] = useState(null); // 현재 선택된 메뉴
    const [selectedSubItem, setSelectedSubItem] = useState(null); // 현재 선택된 서브 아이템
    const [isMenuAreaInSubItems, setMenuAreaInSubItems] = useState(false); // menu_area가 subItems를 보여주는지 여부
    const [selectedModel, setSelectedModel] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            setSelectedMenu(menuData[0]); // 메뉴가 열릴 때 첫 번째 메뉴 기본 선택
            setSelectedSubItem(null);
            setMenuAreaInSubItems(false); // 초기 상태로 복귀
        }
    }, [isOpen]);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        setSelectedSubItem(null);
        setMenuAreaInSubItems(false); // 메뉴 클릭 시 초기화
    };

    const handleSubItemClick = (subItem) => {
        setSelectedSubItem(subItem);
        setSelectedModel(null);
        setMenuAreaInSubItems(true);
    };

    const handleModelClick = (model) => {
        setSelectedModel(model);
        const path = `/custom/department/${encodeURIComponent(selectedSubItem.title)}/${encodeURIComponent(model.title)}`;
        navigate(path);
        onClose();
    };

    const handleBackClick = () => {
        if (selectedModel) {
            setSelectedModel(null);
            return;
        }
        if (selectedSubItem) {
            setSelectedSubItem(null);
            setMenuAreaInSubItems(false);
        }
    };

    return (
        <div className="menu">
            <div className={`backdrop ${isOpen ? 'show' : ''}`} onClick={onClose}></div>
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={onClose}>x</button>

                {/* Left: menu_area */}
                <div className="menu_area">
                    <nav>
                        {isMenuAreaInSubItems ? (
                            <>
                                {(selectedMenu || selectedSubItem) && (
                                    <button className="back-btn" onClick={handleBackClick}>
                                        &larr; {selectedMenu?.title || "Menu"}
                                    </button>
                                )}
                                {selectedMenu?.subItems.map((subItem) => (
                                    <button
                                        key={subItem.title}
                                        className={`menu-item ${selectedSubItem?.title === subItem.title ? 'active' : ''}`}
                                        onClick={() => handleSubItemClick(subItem)}
                                    >
                                        {subItem.title}
                                    </button>
                                ))}
                            </>
                        ) : (
                            menuData.map((menu) => (
                                <button
                                    key={menu.title}
                                    className={`menu-item ${selectedMenu?.title === menu.title ? 'active' : ''}`}
                                    onClick={() => handleMenuClick(menu)}
                                >
                                    {menu.title}
                                </button>
                            ))
                        )}
                    </nav>
                </div>

                {/* Right: menu_content */}
                <div className="menu_content">
                    {selectedSubItem ? (
                        <div className="models-list">
                            <h2>{selectedSubItem.title}</h2>
                            <nav>
                                {selectedSubItem.models.map((model) => (
                                    <button
                                        key={model.title}
                                        className={`menu-item ${selectedModel?.title === model.title ? 'active' : ''}`}
                                        onClick={() => handleModelClick(model)}
                                    >
                                        {model.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    ) : selectedMenu && (  // selectedMenu가 존재할 때만 렌더링
                        <nav>
                            {selectedMenu.subItems.map((subItem) => (
                                <button
                                    key={subItem.title}
                                    className={`menu-item ${selectedSubItem?.title === subItem.title ? 'active' : ''}`}
                                    onClick={() => handleSubItemClick(subItem)}
                                >
                                    {subItem.title}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Menu;