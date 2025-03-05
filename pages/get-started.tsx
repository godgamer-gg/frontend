import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function GetStarted() {
    const router = useRouter();
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/session');
            if (response.ok) {
                // const data = await response.json();
                // setUser(data.user);

                // just redirect the user on if they are already logged in
                router.push('/scoring/score-home');
            } else {
                console.log('User is not logged in');
                setUser('');
            }
        };

        fetchSession();
    }, []);

    return (
        <div>
            <Head>
                <title>Getting Started</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />

            {user === '' ? (
                <div>
                    <h1> Let's Get Started!</h1>

                    <Button href="/login" variant="contained">
                        Login
                    </Button>

                    <Button href="/create-account" variant="contained">
                        Create Account
                    </Button>

                    <Button href="/scoring/score-home" variant="contained">
                        Continue as guest
                    </Button>
                </div>
            ) : (
                <div>
                    <Button href="/scoring/score-home" varient="contained">
                        Continue
                    </Button>
                </div>
            )}
        </div>
    );
}
