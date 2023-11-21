const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const { filterSongsByGenres } = require('../controllers/songController');
const User  = require('../models/userModel');

router.post('/filtered-songs', requireAuth, async (req, res) => {
  const { selectedGenres } = req.body;
  try {
    // Check if req.user is defined
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    // Fetching user details to get the language preference
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const languagePreference = user.languagePreference;

    // Call the function with both selected genres and language preference
    const filteredSongs = await filterSongsByGenres(selectedGenres, languagePreference);
    res.json({ songs: filteredSongs });
} catch (error) {
    console.error('Error filtering songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;