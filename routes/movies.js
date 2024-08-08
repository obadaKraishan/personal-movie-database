import express from 'express';
import Movie from '../models/Movie.js';

const router = express.Router();

// Get all movies
router.get('/', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Add a new movie
router.post('/', async (req, res) => {
  const { title, director, year, genre, poster } = req.body;
  const newMovie = new Movie({ title, director, year, genre, poster });
  await newMovie.save();
  res.status(201).json(newMovie);
});

// Update a movie
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, director, year, genre, poster } = req.body;
  const updatedMovie = await Movie.findByIdAndUpdate(id, { title, director, year, genre, poster }, { new: true });
  res.json(updatedMovie);
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Movie.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
