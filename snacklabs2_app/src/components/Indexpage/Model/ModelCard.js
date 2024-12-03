// src/components/Models/ModelCard.js
import React from 'react';
import './ModelCard.css';

function ModelCard({ model, onSelect }) {
    return (
        <div className="model-card">
            <img src={model.image} alt={model.name} />
            <h3>{model.name}</h3>
            <button onClick={() => onSelect(model)}>Select</button>
        </div>
    );
}

export default ModelCard;