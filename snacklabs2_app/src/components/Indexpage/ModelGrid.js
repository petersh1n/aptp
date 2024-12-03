// src/components/IndexMain/ModelGrid.js
import React from 'react';
import ModelCard from './Model/ModelCard';
import './ModelGrid.css';

function ModelGrid({ models, onSelect }) {
    return (
        <div className="model-grid">
            {models.map((model, index) => (
                <ModelCard key={index} model={model} onSelect={onSelect} />
            ))}
        </div>
    );
}

export default ModelGrid;