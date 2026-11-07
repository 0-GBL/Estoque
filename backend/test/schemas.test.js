import test from 'node:test';
import assert from 'node:assert/strict';
import { productSchema } from '../src/schemas/productSchema.js';
import { movementSchema } from '../src/schemas/movementSchema.js';

test('aceita produto válido e normaliza o código', () => {
  const result = productSchema.parse({ name: ' Mouse ', price: '89.9', quantity: '5', code: ' mou-01 ' });
  assert.deepEqual(result, { name: 'Mouse', price: 89.9, quantity: 5, code: 'MOU-01' });
});

test('rejeita quantidade negativa de produto', () => {
  assert.equal(productSchema.safeParse({ name: 'Mouse', price: 20, quantity: -1, code: 'M-1' }).success, false);
});

test('rejeita movimentação sem quantidade positiva', () => {
  assert.equal(movementSchema.safeParse({ productId: '507f1f77bcf86cd799439011', type: 'OUT', quantity: 0 }).success, false);
});
