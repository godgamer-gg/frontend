import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

export default function Calculators() {
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/session');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
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
                <title>Calculate your score</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <h1> Score calculators</h1>

            <Button href="./steam-score" variant="contained">
                Steam
            </Button>
        </div>
    );
}
