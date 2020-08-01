const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

export default function encrypt(msg) {
    const encrypted = key.encrypt(msg, "base64");
    return encrypted;
  }
export function decrypt(encMsg){
    const decrypted = key.decrypt(encMsg,"utf8");
    return decrypted;
}