import { Router } from 'express';

import { api, request } from '../middlewares';
import payment from './payment';

const middlewares = [request, api];
const router = Router();

// Endpoints
router.post('/payment', ...middlewares, payment);

export default router;
