import CryptoJS from "crypto-js";

import "dotenv/config";

function encryptValue(val) {
  return CryptoJS.AES.encrypt(val, process.env.CRYPTOJS_SECRET_KEY).toString();
}

function decryptValue(val) {
  return CryptoJS.AES.decrypt(val, process.env.CRYPTOJS_SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
}

export { decryptValue, encryptValue };
