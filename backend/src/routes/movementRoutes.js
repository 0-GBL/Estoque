import { Router } from 'express';
import { createMovement, listMovements } from '../controllers/movementController.js';

export const movementRoutes = Router();
movementRoutes.get('/', listMovements);
movementRoutes.post('/', createMovement);
