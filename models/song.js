const mongoose = require('mongoose');
const schema = mongoose.Schema;

const songsSchema = new mongoose.Schema({
    // songs : { type : Array , default : [] },
    songname : String,
    category : String,
    image : String
  })

const song = mongoose.model('songs',songsSchema);  

module.exports = song;