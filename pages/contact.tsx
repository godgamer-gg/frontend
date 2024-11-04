import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function Contact() {
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
                <title>Contact</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <h1> Contact info will go here</h1>

            {/* <Footer /> */}
        </div>
    );
}
