// Handles login API calls

import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const { username, password } = req.body;
        const credentials = btoa(`${username}:${password}`);

        const response = await fetch('http://localhost:8000/auth', {
            method: req.method,
            headers: {
                Authorization: `Basic ${credentials}`,
                'Content-Type': 'application/json',
            },
        });

        // On login failure get the error message and pass it on
        if (!response.ok) {
            console.error('failed to log in: ');
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
                maxAge: 60 * 60 * 24 * 7, // one week of lifetime
                sameSite: 'strict',
                path: '/',
            }),
        );

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login: ', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
