import CryptoJS from 'crypto-js';

import { createClient } from '@supabase/supabase-js';

import 'dotenv/config';

const baseurl = process.env.NODE_ENV
    ? 'https://sahyog-backend.vercel.app'
    : 'http://localhost:5172';

function encryptValue(val) {
    return CryptoJS.AES.encrypt(
        val,
        process.env.CRYPTOJS_SECRET_KEY
    ).toString();
}

function decryptValue(val) {
    return CryptoJS.AES.decrypt(
        val,
        process.env.CRYPTOJS_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
}

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
        },
    }
);

export { baseurl, decryptValue, encryptValue, supabase };
