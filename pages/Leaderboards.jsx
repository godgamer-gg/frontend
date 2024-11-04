import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import { useState, useEffect } from 'react';

export default function Leaderboards() {
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
                <title>Leaderboards</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <h1> Leaderboards will go here</h1>
        </div>
    );
}
