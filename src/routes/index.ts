import { Router } from 'express';
import AuthRoutes from 'routes/AuthRoutes';
import UserRoutes from 'routes/UserRoutes';

const routes = Router();

routes.use('/api/auth', AuthRoutes);
routes.use('/api/user', UserRoutes);

export default routes;
