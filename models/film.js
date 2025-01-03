const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  annee: Number,
  genre: String,
  realisateur: String,
  synopsis: String
});

// Transformer le JSON renvoyé pour convertir _id
filmSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    return ret;
  }
});

module.exports = mongoose.model('Film', filmSchema);
