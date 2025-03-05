import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

interface User {
    username: string;
    email?: string;
    steam?: string;
    discord?: string;
    bio?: string;
}

interface GreetingProps {
    user: User | '';
}

const Greeting: React.FC<GreetingProps> = ({ user }) => {
    if (user && typeof user === 'object') {
        return <h1 className={styles.title}> Welcome! {user.username} </h1>;
    } else {
        return (
            <h1 className={styles.title}>
                Welcome! Please sign up or continue as guest
            </h1>
        );
    }
};

const Home: React.FC = () => {
    const [user, setUser] = useState<User | ''>('');

    useEffect(() => {
        const fetchSession = async (): Promise<void> => {
            try {
                const response = await fetch('/api/session');
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    console.log('User is not logged in');
                    setUser('');
                }
            } catch (error) {
                console.error('Error fetching session:', error);
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

            <main className={styles.main}>
                <Greeting user={user} />
                {user === '' ? (
                    <div>
                        <Button
                            href="/scoring/guest-score-home"
                            variant="outlined"
                            sx={{
                                color: '#ffffff',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <p className={styles.description}>
                                Continue as Guest
                            </p>
                        </Button>
                    </div>
                ) : (
                    <div>
                        <Button
                            href="/scoring/score-home"
                            variant="outlined"
                            sx={{
                                color: '#ffffff',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                '&:hover': {
                                    borderColor: 'rgba(255, 255, 255, 0.6)',
                                    backgroundColor:
                                        'rgba(255, 255, 255, 0.05)',
                                },
                            }}
                        >
                            <p className={styles.description}>
                                Calculate my Score
                            </p>
                        </Button>
                    </div>
                )}
                <br />
                <h2 className={styles.description}>Search for a user</h2>
                <SearchBar />
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
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
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
                    background: rgba(255, 255, 255, 0.05);
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
                    background-color: #121212;
                    color: #ffffff;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export default Home;
