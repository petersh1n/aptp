import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModelGrid from '../components/Indexpage/ModelPart/ModelGrid';
import menuData from '../data/menuData';
import './Homepage.css';

function Homepage() {
    const navigate = useNavigate();
    const [selectedModel, setSelectedModel] = useState(null);
    const [models, setModels] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 모델 데이터 초기화
        const initializeModels = () => {
            const loggedInUserGroup = localStorage.getItem('userGroup');
            const departmentItem = menuData.find(item => item.title === "Department");

            if (loggedInUserGroup) {
                const groupItem = departmentItem?.subItems.find(
                    item => item.title === loggedInUserGroup
                );
                setModels(groupItem?.models || []);
            } else {
                const defaultGroup = departmentItem?.subItems.find(
                    item => item.title === "Young Adult Group 1"
                );
                setModels(defaultGroup?.models || []);
            }
        };

        initializeModels();
    }, []);

    useEffect(() => {
        // 로그인 상태 확인
        const checkLoginStatus = () => {
            const userGroup = localStorage.getItem('userGroup');
            setIsLoggedIn(!!userGroup);
        };

        checkLoginStatus();
    }, []);

    const handleModelSelect = (model) => {
        setSelectedModel(model); // 먼저 선택된 모델 상태 업데이트
        const userGroup = localStorage.getItem('userGroup') || "Young Adult Group 1";
        const path = `/custom/department/${encodeURIComponent(userGroup)}/${encodeURIComponent(model.title)}`;
        navigate(path);
    };

    return (
        <div className="Homepage">
            <ModelGrid
                models={models}
                onModelSelect={handleModelSelect}
                isLoggedIn={isLoggedIn}
                selectedModel={selectedModel}
            />
        </div>
    );
}

export default Homepage;
