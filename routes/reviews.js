import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Get all reviews for a movie
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movie: movieId }).populate('movie');
  res.json(reviews);
});

// Add a new review
router.post('/', async (req, res) => {
  const { movie, user, rating, reviewText } = req.body;
  const newReview = new Review({ movie, user, rating, reviewText });
  await newReview.save();
  res.status(201).json(newReview);
});

// Update a review
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { rating, reviewText } = req.body;
  const updatedReview = await Review.findByIdAndUpdate(id, { rating, reviewText }, { new: true });
  res.json(updatedReview);
});

// Delete a review
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Review.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
