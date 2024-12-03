// src/components/IndexMain/IndexMain.js
import React, { useState } from 'react';
import ModelGrid from './ModelGrid';
import SelectedModel from './SelectedModel';
import models from '../../data/models'; // 모델 데이터 파일
import './IndexMain.css';

function IndexMain() {
    const [selectedModel, setSelectedModel] = useState(null); // 선택된 모델 상태 관리

    const handleModelSelect = (model) => {
        setSelectedModel(model); // 모델 선택 시 상태 업데이트
    };

    return (
        <div className="IndexMain">
            {selectedModel ? (
                <SelectedModel
                    model={selectedModel}
                    onBack={() => setSelectedModel(null)}
                />
            ) : (
                <ModelGrid
                    models={models}
                    onModelSelect={handleModelSelect}
                />
            )}
        </div>
    );
}

export default IndexMain;