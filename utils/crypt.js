const CryptoJS = require('crypto-js');
const masterCryptoKey = '123456$#@$^@1ERF'

function encryptValue(keys, value){
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(keys);
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

  return encrypted.toString();
}

function decryptValue(keys, value) {
  const key = CryptoJS.enc.Utf8.parse(keys);
  const iv = CryptoJS.enc.Utf8.parse(keys);
  const decrypted = CryptoJS.AES.decrypt(value, key, {
    keySize: 128 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  console.log('decrypted', decrypted.toString(CryptoJS.enc.Utf8));

  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { decryptValue, encryptValue, masterCryptoKey }
