// gets info on the currently logged in user
// effectively used to verify session with more info returned

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

    try {
        // token found, verify token from fastapi
        const response = await fetch(
            'http://localhost:8000/auth/current-user',
            {
                method: 'Post',
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        if (!response.ok) {
            console.error('failed to fetch account details: ');
            const errorMsg = await response.json();
            console.error(JSON.stringify(errorMsg, null, 2));
            return res.status(401).json({ message: errorMsg.detail });
        }

        const userData = await response.json();
        res.status(200).json({ user: userData });
    } catch (error) {
        console.error('Error creating account', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
