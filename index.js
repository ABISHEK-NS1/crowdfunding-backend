import cors from 'cors';
import express from 'express';
import { createRouteHandler } from 'uploadthing/express';

import {
    checkForName,
    signIn,
    signUp,
} from './src/controllers/authController.js';
import {
    getFundraiserDonationsById,
    getUserDonationsById,
    saveDonation,
} from './src/controllers/donationController.js';
import {
    deleteFundraiser,
    deleteFundraiserDraft,
    deleteFundraiserUpdate,
    getAllFundraisers,
    getDraftFundraiser,
    getFundraiserById,
    getFundraiserUpdates,
    getUserFundraiserById,
    getUserFundraisers,
    postFundraiserUpdate,
    saveFundraiser,
    updateFundraiser,
} from './src/controllers/fundraiserController.js';
import {
    cancelPaymentIntent,
    createConfirmIntent,
    createPaymentIntent,
} from './src/controllers/stripeController.js';
import { connectDb } from './src/database/db.js';
import { authenticate } from './src/middlewares/authenticate.js';
import { uploadRouter } from './src/utils/uploadthing.js';

import 'dotenv/config';

connectDb();

const app = express();
const PORT = 5172;

app.use(cors());
app.use(
    '/api/uploadthing',
    createRouteHandler({
        router: uploadRouter,
    })
);
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//AUTH ROUTES
app.post('/api/auth/checkForName', checkForName);
app.post('/api/auth/sign-up', signUp);
app.post('/api/auth/sign-in', signIn);

//USER ROUTES
app.post(
    '/api/user/getDraftFundraiser',
    authenticate,
    getDraftFundraiser
);
app.post(
    '/api/user/deleteDraftFundraiser',
    authenticate,
    deleteFundraiserDraft
);
app.post(
    '/api/user/getAllFundraisers',
    authenticate,
    getUserFundraisers
);
app.post(
    '/api/user/getUserFundraiserById',
    authenticate,
    getUserFundraiserById
);
app.post(
    '/api/user/deleteFundraiser',
    authenticate,
    deleteFundraiser
);

//FUNDRAISERS ROUTE
app.post(
    '/api/fundraiser/getFundraiserUpdates',
    getFundraiserUpdates
);
app.post(
    '/api/fundraiser/postFundraiserUpdate',
    authenticate,
    postFundraiserUpdate
);
app.post(
    '/api/fundraiser/deleteFundraiserUpdate',
    authenticate,
    deleteFundraiserUpdate
);
app.post('/api/fundraiser/getAllFundraisers', getAllFundraisers);
app.post(
    '/api/fundraiser/saveFundraiser',
    authenticate,
    saveFundraiser
);
app.post(
    '/api/fundraiser/updateFundraiser',
    authenticate,
    updateFundraiser
);
app.post('/api/fundraiser/getFundraiserById', getFundraiserById);

//DONATIONS ROUTE
app.post(
    '/api/donation/saveDonation',
    authenticate,
    saveDonation
);
app.post(
    '/api/donation/getFundraiserDonationsById',
    getFundraiserDonationsById
);
app.post(
    '/api/donation/getUserDonationsById',
    authenticate,
    getUserDonationsById
);

//STRIPE ROUTE
app.post(
    '/api/stripe/createPaymentIntent',
    authenticate,
    createPaymentIntent
);
app.post(
    '/api/stripe/cancelPaymentIntent',
    authenticate,
    cancelPaymentIntent
);
app.post(
    '/api/stripe/createConfirmIntent',
    authenticate,
    createConfirmIntent
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
