const fs = require('fs');
const csvParser = require('csv-parser');
const _ = require('lodash');

const filterSongsByGenres = (selectedGenres) => {
  return new Promise((resolve, reject) => {
      const groupedSongs = {};

      fs.createReadStream('assets/testmusic.csv')
          .pipe(csvParser())
          .on('data', (row) => {
              if (selectedGenres.includes(row.genre)) {
                  if (!groupedSongs[row.genre]) {
                      groupedSongs[row.genre] = [];
                  }
                  groupedSongs[row.genre].push({
                      track_id: row.track_id,
                      track_name: row.track_name,
                      artists: row.artists,
                      genre: row.genre
                  });
              }
          })
          .on('end', () => {
              const randomSongs = {};

              // Select random 5 songs from each genre
              Object.keys(groupedSongs).forEach((genre) => {
                  randomSongs[genre] = _.sampleSize(groupedSongs[genre], 5);
              });

              resolve(randomSongs);
          })
          .on('error', (error) => {
              reject(error);
          });
  });
};

module.exports = { filterSongsByGenres }