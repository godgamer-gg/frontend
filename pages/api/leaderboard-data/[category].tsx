// gets info on the currently logged in user
// effectively used to verify session with more info returned

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    category: string,
) {
    try {
        const response = await fetch(
            'http://localhost:8000/leaderboard-data/' + category,
            {
                method: req.method,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        if (!response.ok) {
            console.error('failed to fetch leaderboard info: ');
            const errorMsg = await response.json();
            console.error(JSON.stringify(errorMsg, null, 2));
            return res.status(401).json({ message: errorMsg.detail });
        }

        const userData = await response.json();
        res.status(200).json({ user: userData });
    } catch (error) {
        console.error('Error fetching leaderboard info', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
