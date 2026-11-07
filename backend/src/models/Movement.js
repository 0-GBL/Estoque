import mongoose from 'mongoose';

const movementSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['IN', 'OUT'], required: true },
    quantity: { type: Number, required: true, min: 1 },
    note: { type: String, trim: true, maxlength: 280, default: '' }
  },
  { timestamps: true, versionKey: false }
);

export const Movement = mongoose.model('Movement', movementSchema);
