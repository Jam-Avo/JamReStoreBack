import { Router } from 'express';
import AuthController from 'controllers/Auth/AuthController';
import { verifyAccessToken } from 'middlewares/Auth/verifyAccessToken';

const router = Router();

router.post("/signIn", AuthController.signIn);
router.post("/signUp", AuthController.signUp);
router.post("/OtpNumber", verifyAccessToken, AuthController.setNumberPhone);
router.post("/createPassword", verifyAccessToken, AuthController.createPassword);
router.post("/validateCode", verifyAccessToken, AuthController.validateCode);
router.get("/sendCode", verifyAccessToken, AuthController.sendCode);

export default router; 