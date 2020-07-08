import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rating: {
    type: Number,
    default: null,
    required: false
  },
  likes: {
    type: Number,
    default: null,
    required: false
  }
});

MusicSchema.index( { unique: true });

const Music = mongoose.model("Music", MusicSchema);


