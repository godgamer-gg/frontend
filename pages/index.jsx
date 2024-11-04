import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Button from '@mui/material/Button';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

const Greeting = ({ user }) => {
    if (user) {
        return <h1 className={styles.title}> Welcome! {user.username} </h1>;
    } else {
        return (
            <h1 className={styles.title}>
                {' '}
                Welcome! Please sign up or continue as guest
            </h1>
        );
    }
};

export default function Home() {
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
        <div className={styles.container}>
            <Head>
                <title>Ultimate Gamer Rank</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />

            <main>
                <Greeting user={user} />
                {user === '' ? (
                    <div>
                        <Button
                            href="/scoring/guest-score-home"
                            variant="contained"
                        >
                            <p className={styles.description}>
                                Continue as Guest
                            </p>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button href="/scoring/score-home" variant="contained">
                            <p className={styles.description}>
                                Calculate my Score
                            </p>
                        </Button>
                    </div>
                )}
            </main>

            <Footer />

            <style jsx>{`
                main {
                    padding: 5rem 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                footer img {
                    margin-left: 0.5rem;
                }
                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    color: inherit;
                }
                code {
                    background: #fafafa;
                    border-radius: 5px;
                    padding: 0.75rem;
                    font-size: 1.1rem;
                    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
                        monospace;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
}
