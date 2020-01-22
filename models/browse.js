const mongoose = require('mongoose');
const schema = mongoose.Schema;

  const browseSchema = new mongoose.Schema({
    category : String,
    photoname : String
  })

const browse = mongoose.model('categories',browseSchema);  

module.exports = browse;