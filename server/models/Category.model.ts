import mongoose from 'mongoose';

// Category schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
    },
  },
  { timestamps: true },
);

// Category model
export default mongoose.model('Category', schema);
