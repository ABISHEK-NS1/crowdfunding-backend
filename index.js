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
app.post('/api/getAllFundraisers', getAllFundraisers);
app.post(
    '/api/getDraftFundraiser',
    authenticate,
    getDraftFundraiser
);
app.post('/api/saveFundraiser', authenticate, saveFundraiser);
app.post(
    '/api/deleteFundraiserDraft',
    authenticate,
    deleteFundraiserDraft
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
