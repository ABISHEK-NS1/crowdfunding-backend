import express from 'express';

import {
    deleteFundraiser,
    deleteFundraiserDraft,
    getDraftFundraiser,
    getUserFundraiserById,
    getUserFundraisers,
} from '../controllers/fundraiserController.js';
import { authenticate } from '../middlewares/authenticate.js';

const userRouter = express.Router();

userRouter.post(
    '/api/user/getDraftFundraiser',
    authenticate,
    getDraftFundraiser
);
userRouter.post(
    '/api/user/deleteDraftFundraiser',
    authenticate,
    deleteFundraiserDraft
);
userRouter.post(
    '/api/user/getAllFundraisers',
    authenticate,
    getUserFundraisers
);
userRouter.post(
    '/api/user/getUserFundraiserById',
    authenticate,
    getUserFundraiserById
);
userRouter.post(
    '/api/user/deleteFundraiser',
    authenticate,
    deleteFundraiser
);

export default userRouter;
