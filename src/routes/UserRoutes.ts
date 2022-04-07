import UserController from 'controllers/User/UserCotroller';
import { Router } from 'express';

const router = Router();

router.post("/editProfile", UserController.editProfile);

export default router;