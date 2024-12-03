// src/components/IndexMain/Selectedmodel.js
import React from 'react';
import './SelectedModel.css';

function SelectedModel({ model, onBack }) {
    return (
        <div className="selected-model">
            <h2>{model.name}</h2>
            <img src={model.image} alt={model.name} />
            <p>{model.description}</p>
            <button onClick={onBack}>Back to models</button>
        </div>
    );
}

export default SelectedModel;