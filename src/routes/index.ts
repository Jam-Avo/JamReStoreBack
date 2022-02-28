import { Router } from 'express';
import AuthRoutes from './AuthRoutes';

const routes = Router();

routes.use('/api/auth', AuthRoutes);

export default routes;
