// src/components/Section/Main/mainHelpers.js

export const validateDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= today;
};