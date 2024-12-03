// src/components/Section/Praise/praiseHelpers.js
export const validatePraiseInput = (data) => {
    const { type, worshipTeam, songTitle, songArtist } = data;
    if (!type || !worshipTeam || songTitle.trim() === '' || songArtist.trim() === '') {
        return false;
    }
    return true;
};