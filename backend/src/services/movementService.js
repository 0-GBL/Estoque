import { Movement } from '../models/Movement.js';
import { Product } from '../models/Product.js';

export async function createMovement({ productId, type, quantity, note }) {
  const product = await Product.findById(productId);
  if (!product) {
    const error = new Error('Produto não encontrado.');
    error.statusCode = 404;
    throw error;
  }
  if (type === 'OUT' && product.quantity < quantity) {
    const error = new Error('Estoque insuficiente para esta saída.');
    error.statusCode = 422;
    throw error;
  }
  product.quantity += type === 'IN' ? quantity : -quantity;
  await product.save();
  return Movement.create({ product: productId, type, quantity, note });
}

export function listMovements() {
  return Movement.find().populate('product', 'name code').sort({ createdAt: -1 }).limit(100);
}
