// src/components/IndexMain/ModelGrid.js
import React, { useState } from 'react';
import ModelCard from './ModelCard';
import './ModelGrid.css';

function ModelGrid({ models, onModelSelect, isLoggedIn }) {
    const [centerIndex, setCenterIndex] = useState(1); // 중앙에 표시될 모델의 인덱스

    // 표시할 모델 필터링
    const displayedModels = React.useMemo(() => {
        if (isLoggedIn) {
            return models; // 로그인 시 전체 모델 표시
        }
        return models.slice(0, 4); // 비로그인 시 상위 4개만 표시
    }, [models, isLoggedIn]);

    console.log('Models:', models);

    const getPositionClass = (index) => {
        const position = (index - centerIndex + displayedModels.length) % displayedModels.length;
        if (position === 0) return 'center';
        if (position === 1) return 'right';
        if (position === displayedModels.length - 1) return 'left';
        return 'behind';
    };

    const handleCardClick = (direction, model, index) => {
        console.log('Clicked model:', model); // 클릭된 모델 데이터 확인
        if (direction === 'center') {
            onModelSelect(model);
            return;
        }
        setCenterIndex(index);
    };

    return (
        <div className="model-carousel">
            {displayedModels.map((model, index) => {
                const positionClass = getPositionClass(index);
                return (
                    <div
                        key={model.id || model.name}
                        className={`model-position ${positionClass}`}
                        onClick={() => handleCardClick(positionClass, model, index)}
                    >
                        <ModelCard
                            model={model}
                            isCenter={positionClass === 'center'}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default ModelGrid;