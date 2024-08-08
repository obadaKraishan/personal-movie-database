import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  user: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true }
});

export default mongoose.model('Review', reviewSchema);
