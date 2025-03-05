import Head from 'next/head';
import styles from '../styles/Page.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/searchBar';
import { useState, useEffect } from 'react';

export default function SearchPage() {
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
                <title>Search for users</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <main className={styles.main}>
                <h1 className={styles.title}>Search for Users</h1>
                <section className={styles.section}>
                    <SearchBar />
                </section>
            </main>
        </div>
    );
}
