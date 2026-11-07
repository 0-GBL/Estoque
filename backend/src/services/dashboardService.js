import { Movement } from '../models/Movement.js';
import { Product } from '../models/Product.js';

export async function getDashboard() {
  const [summary] = await Product.aggregate([
    { $group: { _id: null, products: { $sum: 1 }, totalUnits: { $sum: '$quantity' }, inventoryValue: { $sum: { $multiply: ['$price', '$quantity'] } }, lowStock: { $sum: { $cond: [{ $and: [{ $gt: ['$quantity', 0] }, { $lte: ['$quantity', 5] }] }, 1, 0] } }, outOfStock: { $sum: { $cond: [{ $eq: ['$quantity', 0] }, 1, 0] } } } }
  ]);
  const recentMovements = await Movement.find().populate('product', 'name code').sort({ createdAt: -1 }).limit(6);
  return { summary: summary || { products: 0, totalUnits: 0, inventoryValue: 0, lowStock: 0, outOfStock: 0 }, recentMovements };
}
