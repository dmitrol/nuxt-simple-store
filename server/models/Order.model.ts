import mongoose from 'mongoose';

// Order schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
    },
    sum: {
      type: Number,
      required: false,
    },
    items: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          requied: true,
        },
      },
    ],
  },
  { timestamps: true },
);

// Order model
export default mongoose.model('Oreder', schema);
