// updates the users profile stored on the server

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.authToken;

        // no token found, not logged in
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const response = await fetch('http://localhost:8000/profile/update', {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            console.error('failed to update account details: ');
            const errorMsg = await response.json();
            console.error('bad response:', JSON.stringify(errorMsg, null, 2));
            return res.status(401).json({ message: errorMsg.detail });
        }

        const userData = await response.json();
        console.log('userData:', userData);
        res.status(200).json({
            message: 'userData received',
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
