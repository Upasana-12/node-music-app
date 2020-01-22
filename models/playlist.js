const mongoose = require('mongoose');
const schema = mongoose.Schema;

  const playlistSchema = new mongoose.Schema({
    name : String,
    ownerid : { type: schema.Types.ObjectId, ref : 'users' },
   // songs : [{type : schema.Types.ObjectId, ref : 'songs'}]
  //  songs : Array
  songs :  [{ type: schema.Types.ObjectId, ref: 'songs' }]
  }) 

const playlist = mongoose.model('playlists',playlistSchema);  

module.exports = playlist;