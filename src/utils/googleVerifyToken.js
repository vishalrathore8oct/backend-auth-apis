import jwt from 'jsonwebtoken';
import { getGoogleSigningKey } from './googleJwks.js';


export const verifyGoogleToken = async (idToken) => {
    try {
        const decodedHeader = jwt.decode(idToken, { complete: true });
        if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
            throw new Error('Invalid token header');
        }

        const kid = decodedHeader.header.kid;

        const publicKey = await getGoogleSigningKey(kid);

        const payload = jwt.verify(idToken, publicKey, {
            algorithms: ['RS256'],
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        return payload;
    } catch (error) {
        console.error('Error verifying Google token:', error);
        throw new Error('Token verification failed');
    }

}