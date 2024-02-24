import express from 'express';

import {
    checkForName,
    resendVerificationMail,
    signIn,
    signUp,
    verifyEmail,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/authenticate.js';

const authRouter = express.Router();

authRouter.post('/api/auth/checkForName', checkForName);
authRouter.post('/api/auth/sign-up', signUp);
authRouter.post('/api/auth/sign-in', signIn);
authRouter.post(
    '/api/auth/resendVerificationMail',
    authenticate,
    resendVerificationMail
);
authRouter.get('/user/verify/:token', verifyEmail);

export default authRouter;
