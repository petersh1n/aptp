// src/components/Models/ModelCard.js
import React from 'react';
import './ModelCard.css';

function ModelCard({ model, isCenter }) {
    console.log('ModelCard received:', model);

    return (
        <div className={`model-card ${isCenter ? 'center' : ''}`}>
            <div className="model-image-container">
                <img src={model.image} alt={model.title} />
            </div>
            <div className="model-info">
                <h3 className="model-title">{model.title || 'Unknown Model'}</h3>
                {isCenter && (
                    <div className="model-details">
                        <p>{model.description}</p>
                        <button className="select-button">
                            Select This Model
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModelCard;
