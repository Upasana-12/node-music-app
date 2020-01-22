const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    firstname : String,
    // plist : { type : Array , default : [] },
   plist : [ { type: schema.Types.ObjectId, ref: 'playlists'  } ],
  })

const user = mongoose.model('users',userSchema);  

module.exports = user;