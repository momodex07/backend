const express = require('express');
const Film = require('../models/film');
const router = express.Router();


// Obtenir tous les films
router.get('/', async (req, res) => {
  try {
    const films = await Film.find();
    if (!Array.isArray(films)) {
      return res.status(500).json({ message: "La réponse n'est pas un tableau" });
    }
    const filmsFormatted = films.map(film => ({
      ...film._doc,
      _id: film._id.toString()
    }));
    res.status(200).json(filmsFormatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Obtenir un film par ID
router.get('/:id', async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film non trouvé' });
    res.status(200).json(film);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un film
router.put('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!film) return res.status(404).json({ message: 'Film non trouvé' });
    res.status(200).json(film);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un film
router.delete('/:id', async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    if (!film) return res.status(404).json({ message: 'Film non trouvé' });
    res.status(200).json({ message: 'Film supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const Joi = require('joi');

const filmSchemaValidation = Joi.object({
  titre: Joi.string().required(),
  annee: Joi.number().integer().required(),
  genre: Joi.string().required(),
  realisateur: Joi.string().optional(),
  synopsis: Joi.string().optional()
});

router.post('/', async (req, res) => {
  const { error } = filmSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const film = new Film(req.body);
    await film.save();
    res.status(201).json(film);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/test', (req, res) => {
  res.json([
    { id: 1, titre: "Film Test", annee: 2023, genre: "Action" },
    { id: 2, titre: "Film Test 2", annee: 2024, genre: "Comédie" }
  ]);
});


module.exports = router;
