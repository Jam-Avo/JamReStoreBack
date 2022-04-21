import { Router } from 'express';
import AuthController from 'controllers/Auth/AuthController';

const router = Router();

router.post("/signIn", AuthController.signIn);
router.post("/signUp", AuthController.signUp);
router.post("/OtpNumber", AuthController.setNumberPhone);
router.post("/otp", AuthController.otpCode);
router.post("/createPassword", AuthController.createPassword);

export default router; 