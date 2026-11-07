import { Product } from '../models/Product.js';

export async function listProducts({ search, stock, sort = 'newest' }) {
  const filter = {};
  if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { code: { $regex: search, $options: 'i' } }];
  if (stock === 'out') filter.quantity = 0;
  if (stock === 'low') filter.quantity = { $gt: 0, $lte: 5 };
  const sorts = { newest: { createdAt: -1 }, name: { name: 1 }, price: { price: -1 }, quantity: { quantity: 1 } };
  return Product.find(filter).sort(sorts[sort] || sorts.newest);
}

export const createProduct = (data) => Product.create(data);

export async function updateProduct(id, data) {
  return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export const removeProduct = (id) => Product.findByIdAndDelete(id);
