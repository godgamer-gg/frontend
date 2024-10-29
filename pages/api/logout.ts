// pages/api/logout.ts

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { useRouter } from 'next/router';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Clear the authToken cookie
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('authToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1, // Expire immediately
            path: '/',
        }),
    );

    // currently doesn't call the server for anything, but if we start tracking users sessions this will change

    res.status(200).json({ message: 'Logged out' });
}
