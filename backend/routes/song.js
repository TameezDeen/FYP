const express = require('express');
const router = express.Router();
const { filterSongsByGenres } = require('../controllers/songController');

router.post('/filtered-songs', async (req, res) => {
  const { selectedGenres } = req.body;
  try {
    const filteredSongs = await filterSongsByGenres(selectedGenres);
    res.json({ songs: filteredSongs });
  } catch (error) {
    console.error('Error filtering songs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;