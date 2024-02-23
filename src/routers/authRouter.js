import express from 'express';

import {
    checkForName,
    signIn,
    signUp,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/api/auth/checkForName', checkForName);
authRouter.post('/api/auth/sign-up', signUp);
authRouter.post('/api/auth/sign-in', signIn);

export default authRouter;
