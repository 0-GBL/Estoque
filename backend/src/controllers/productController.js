import { Product } from '../models/Product.js';
import { productSchema } from '../schemas/productSchema.js';

function parseProduct(body) {
  const result = productSchema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0].message);
    error.statusCode = 400;
    throw error;
  }
  return result.data;
}

export async function listProducts(_request, response) {
  const products = await Product.find().sort({ createdAt: -1 });
  return response.json(products);
}

export async function createProduct(request, response) {
  const product = await Product.create(parseProduct(request.body));
  return response.status(201).json(product);
}

export async function updateProduct(request, response) {
  const product = await Product.findByIdAndUpdate(
    request.params.id,
    parseProduct(request.body),
    { new: true, runValidators: true }
  );
  if (!product) return response.status(404).json({ message: 'Produto não encontrado.' });
  return response.json(product);
}

export async function deleteProduct(request, response) {
  const product = await Product.findByIdAndDelete(request.params.id);
  if (!product) return response.status(404).json({ message: 'Produto não encontrado.' });
  return response.status(204).send();
}
