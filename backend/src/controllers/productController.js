import { productSchema } from '../schemas/productSchema.js';
import * as productService from '../services/productService.js';

function parseProduct(body) {
  const result = productSchema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0].message);
    error.statusCode = 400;
    throw error;
  }
  return result.data;
}

export async function listProducts(request, response) {
  const products = await productService.listProducts(request.query);
  return response.json(products);
}

export async function createProduct(request, response) {
  const product = await productService.createProduct(parseProduct(request.body));
  return response.status(201).json(product);
}

export async function updateProduct(request, response) {
  const product = await productService.updateProduct(request.params.id, parseProduct(request.body));
  if (!product) return response.status(404).json({ message: 'Produto não encontrado.' });
  return response.json(product);
}

export async function deleteProduct(request, response) {
  const product = await productService.removeProduct(request.params.id);
  if (!product) return response.status(404).json({ message: 'Produto não encontrado.' });
  return response.status(204).send();
}
