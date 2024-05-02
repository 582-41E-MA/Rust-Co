import React, { useState, useEffect } from 'react';
import { t } from "i18next";

function CustomAlert({ message, isVisible, onClose }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();  // Automatically close alert after 3 seconds
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-sand_2 rounded-lg shadow-xl p-6 flex flex-col text-center items-center justify-center gap-4">
                <h2 className="text-lg font-bold">{message}</h2>
                <button onClick={onClose} className="custom-button">
                    {t('fermer')}
                </button>
            </div>
        </div>
    );
}

export default CustomAlert;