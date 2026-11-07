import { z } from 'zod';

export const movementSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Produto inválido.'),
  type: z.enum(['IN', 'OUT']),
  quantity: z.coerce.number().int().min(1, 'Informe uma quantidade maior que zero.'),
  note: z.string().trim().max(280).optional().default('')
});
