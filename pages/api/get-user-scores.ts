// calculates all scores for a user

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
            return res.status(401).json({ message: 'Not logged in' });
        }

        // token found, verify token from fastapi
        const response = await fetch(
            'http://localhost:8000/scoring/all/user/current',
            {
                method: 'get',
                headers: { Authorization: `Bearer ${token}` },
            },
        );

        if (!response.ok) {
            console.error('failed to fetch scores: ');
            const errorMsg = await response.json();
            console.error(JSON.stringify(errorMsg, null, 2));
            return res.status(401).json({ message: errorMsg.detail });
        }
        const score = await response.json();
        res.status(200).json({ user: score });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
