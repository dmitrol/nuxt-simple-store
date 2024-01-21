import mongoose from 'mongoose';

// Product schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      requied: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    price: Number,
    image: {
      type: String || null,
    },
  },
  { timestamps: true },
);

// Product model
export default mongoose.model('Product', schema);
