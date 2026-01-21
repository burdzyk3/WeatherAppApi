import React from 'react';

function ErrorModal({ message, onClose }) {
    if (!message) return null;

    return (
        <div className="error-modal-overlay">
            <div className="error-modal-content">
                <h3>Błąd</h3>
                <p>{message}</p>
                <button onClick={onClose} className="error-modal-close">Zamknij</button>
            </div>
        </div>
    );
}

export default ErrorModal;
