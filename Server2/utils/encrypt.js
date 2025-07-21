const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = crypto.scryptSync('your-secret-password', 'salt', 32); // store 'your-secret-password' in .env
const iv = crypto.randomBytes(16); // generate random IV

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

module.exports = { encrypt };
