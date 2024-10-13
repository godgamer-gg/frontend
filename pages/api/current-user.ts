// gets info on the currently logged in user

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.authToken;

    // no token found, not logged in
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    // token found, verify token from fastapi
    const response = await fetch('http://localhost:8000/auth/verify', {
        method: 'Post',
        headers: { Authorization: `Bearer ${token}` },
    });
}
