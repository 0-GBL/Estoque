import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    code: { type: String, required: true, trim: true, uppercase: true, unique: true, maxlength: 50 }
  },
  { timestamps: true, versionKey: false }
);

export const Product = mongoose.model('Product', productSchema);
