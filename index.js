import cors from 'cors';
import express from 'express';
import { createRouteHandler } from 'uploadthing/express';

import {
    authenticate,
    checkForName,
    signIn,
    signUp,
} from './src/controllers/authController.js';
import {
    deleteFundraiserDraft,
    getAllFundraisers,
    getDraftFundraiser,
    getUserFundraisers,
    saveFundraiser,
} from './src/controllers/fundraiserController.js';
import { connectDb } from './src/lib/db.js';
import { uploadRouter } from './src/uploadthing.js';

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
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/auth/checkForName', checkForName);
app.post('/api/auth/sign-up', signUp);
app.post('/api/auth/sign-in', signIn);
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
app.post('/api/fundraiser/getAllFundraisers', getAllFundraisers);
app.post(
    '/api/fundraiser/saveFundraiser',
    authenticate,
    saveFundraiser
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
