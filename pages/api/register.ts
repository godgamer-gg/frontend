// registers a new user and logs them in

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { username, email, password } = req.body;

        const response = await fetch('http://localhost:8000/register', {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            console.error('failed to create account: ');
            const errorMsg = await response.json();
            console.error(JSON.stringify(errorMsg, null, 2));
            return res.status(401).json({ message: errorMsg.detail });
        }

        // on success assume the backend responds with the JWT and save it
        const data = await response.json();
        const token = data.access_token;
        console.log('token received: ', token);
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // might want to bypass this for now
                maxAge: 60 * 60 * 24, // one day of lifetime
                sameSite: 'strict',
                path: '/',
            }),
        );

        res.status(200).json({ message: 'account created successfully' });
    } catch (error) {
        console.error('Error creating account', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
