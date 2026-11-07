import { movementSchema } from '../schemas/movementSchema.js';
import * as movementService from '../services/movementService.js';

function parseMovement(body) {
  const result = movementSchema.safeParse(body);
  if (!result.success) {
    const error = new Error(result.error.issues[0].message);
    error.statusCode = 400;
    throw error;
  }
  return result.data;
}

export async function createMovement(request, response) {
  const movement = await movementService.createMovement(parseMovement(request.body));
  return response.status(201).json(movement);
}

export async function listMovements(_request, response) {
  return response.json(await movementService.listMovements());
}
