import jwksClient from "jwks-rsa";
import dotenv from "dotenv";
dotenv.config();

const client = jwksClient({
    jwksUri: process.env.GOOGLE_JWKS_URL,
    cache: true,
    rateLimit: true,
});

export const getGoogleSigningKey = async (kid) => {
    return new Promise((resolve, reject) => {
        client.getSigningKey(kid, (err, key) => {
            if (err) {
                console.error("Error fetching signing key from Google JWKS:", err);
                return reject(err);
            }
            const publicKey = key.getPublicKey();
            resolve(publicKey);
        });
    });
};
