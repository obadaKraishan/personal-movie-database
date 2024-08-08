import express from 'express';
import Watchlist from '../models/Watchlist.js';

const router = express.Router();

// Get all watchlists for a user
router.get('/:user', async (req, res) => {
  const { user } = req.params;
  const watchlists = await Watchlist.find({ user }).populate('movies');
  res.json(watchlists);
});

// Add a new watchlist
router.post('/', async (req, res) => {
  const { name, movies, user } = req.body;
  const newWatchlist = new Watchlist({ name, movies, user });
  await newWatchlist.save();
  res.status(201).json(newWatchlist);
});

// Update a watchlist
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, movies } = req.body;
  const updatedWatchlist = await Watchlist.findByIdAndUpdate(id, { name, movies }, { new: true }).populate('movies');
  res.json(updatedWatchlist);
});

// Delete a watchlist
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Watchlist.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
