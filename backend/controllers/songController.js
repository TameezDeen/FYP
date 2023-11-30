const fs = require('fs');
const csvParser = require('csv-parser');
const _ = require('lodash');
const User = require('../models/userModel');

const filterSongsByGenres = (selectedGenres, languagePreference) => {
    return new Promise((resolve, reject) => {
        const groupedSongs = {};

        fs.createReadStream('assets/dataset.csv')
            .pipe(csvParser())
            .on('data', (row) => {
                if (
                    selectedGenres.includes(row.genre) &&
                    row.language === languagePreference
                ) {
                    if (!groupedSongs[row.genre]) {
                        groupedSongs[row.genre] = [];
                    }
                    groupedSongs[row.genre].push({
                        track_id: row.track_id,
                        track_name: row.track_name,
                        artists: row.artists,
                        genre: row.genre,
                    });
                }
            })
            .on('end', () => {
                const randomSongs = {};

                // Select random 5 songs from each genre
                Object.keys(groupedSongs).forEach((genre) => {
                    randomSongs[genre] = _.sampleSize(groupedSongs[genre], 5);
                });

                saveFilteredSongsToDatabase(randomSongs, languagePreference); 

                resolve(randomSongs);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};

const saveFilteredSongsToDatabase = async (randomSongs, languagePreference) => {
    try {
      const trackIds = [];
  
      // Iterate through the randomSongs object and extract track_id
      Object.keys(randomSongs).forEach((genre) => {
        randomSongs[genre].forEach((song) => {
          trackIds.push(song.track_id);
        });
      });
  
      // Save trackIds to the database
      await saveTrackIdsToDatabase(trackIds, languagePreference);
  
      console.log("Filtered Songs saved to the database:", trackIds);
    } catch (error) {
      console.error("Error saving filtered songs to the database:", error);
    }
  };
  
  const saveTrackIdsToDatabase = async (trackIds, languagePreference) => {
    try {
      // Update this function based on your database model
      // You might need to use an ORM like Mongoose if you're using MongoDB
  
      // Example using Mongoose with MongoDB
      const user = await User.findOneAndUpdate(
        { languagePreference: languagePreference },
        { $push: { filteredSongs: { $each: trackIds } } },
        { new: true }
      );
  
      if (!user) {
        console.error("User not found for saving filtered songs");
      }
  
      console.log("Track IDs saved to the database:", trackIds);
    } catch (error) {
      console.error("Error saving track IDs to the database:", error);
    }
  };

module.exports = { filterSongsByGenres, saveFilteredSongsToDatabase }