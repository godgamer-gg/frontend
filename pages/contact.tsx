import Head from 'next/head';
import styles from '../styles/Page.module.css';
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
                <title>Contact Us</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <main className={styles.main}>
                <h1 className={styles.title}>Contact Us</h1>

                <section className={styles.section}>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name" className={styles.text}>
                                Name:
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.text}>
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={styles.input}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message" className={styles.text}>
                                Message:
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className={styles.input}
                                rows={5}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Send Message
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
}
