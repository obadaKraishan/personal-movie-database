import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  user: { type: String, required: true }
});

export default mongoose.model('Watchlist', watchlistSchema);
