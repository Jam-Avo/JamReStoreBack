import { Router } from 'express';
import AuthController from 'controllers/Auth/AuthController';

const router = Router();

router.post("/signIn", AuthController.signIn);
router.post("/signUp", AuthController.signUp);
router.get("/authentication", AuthController.authentication);
router.post("/changePassword", AuthController.changePassword);

export default router;