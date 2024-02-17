import { createClient } from "@supabase/supabase-js";
import CryptoJS from "crypto-js";

import "dotenv/config";

function encryptValue(val) {
  return CryptoJS.AES.encrypt(val, process.env.CRYPTOJS_SECRET_KEY).toString();
}

function decryptValue(val) {
  return CryptoJS.AES.decrypt(val, process.env.CRYPTOJS_SECRET_KEY).toString(CryptoJS.enc.Utf8);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});

export { decryptValue, encryptValue, supabase };
