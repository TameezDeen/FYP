const fs = require('fs');
const csvParser = require('csv-parser');

const filterSongsByGenres = (selectedGenres) => {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream('assets/test.csv')
        .pipe(csvParser())
        .on('data', (row) => {
          if (selectedGenres.includes(row.genre)) {
            // results.push(row.track_name);
            results.push({ 
              track_id: row.track_id,
              track_name: row.track_name, 
              artists: row.artists, 
              genre: row.genre});
          }
        })
        .on('end', () => {
          if (results.length > 0) {
            resolve(results);
          } else {
            reject(new Error('No songs found for the selected genres.'));
          }
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  };

module.exports = { filterSongsByGenres }