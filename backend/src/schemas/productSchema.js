import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório.').max(120),
  price: z.coerce.number().min(0, 'O valor não pode ser negativo.'),
  quantity: z.coerce.number().int('A quantidade deve ser um número inteiro.').min(0, 'A quantidade não pode ser negativa.'),
  code: z.string().trim().min(1, 'O código é obrigatório.').max(50).transform((value) => value.toUpperCase())
});
