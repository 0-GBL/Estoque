import { Router } from 'express';
import { createProduct, deleteProduct, listProducts, updateProduct } from '../controllers/productController.js';

export const productRoutes = Router();

productRoutes.get('/', listProducts);
productRoutes.post('/', createProduct);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);
