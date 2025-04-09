import Head from 'next/head';
import styles from '../styles/Page.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function Contact() {
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                // Clear the form
                setName('');
                setEmail('');
                setMessage('');
            } else {
                setSubmitStatus('error');
                console.error('Error submitting form:', data.message);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    {submitStatus === 'success' ? (
                        <div className={styles.success}>
                            <h2 className={styles.subheading}>Thank You!</h2>
                            <p className={styles.text}>
                                Your message has been sent successfully. We'll
                                get back to you as soon as possible.
                            </p>
                            <p className={styles.text}>
                                If you don't receive a response within 48 hours,
                                please check your spam folder or try contacting
                                us through our social media channels.
                            </p>
                            <button
                                className={styles.button}
                                onClick={() => setSubmitStatus('')}
                            >
                                Send Another Message
                            </button>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name" className={styles.text}>
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label
                                    htmlFor="message"
                                    className={styles.text}
                                >
                                    Message:
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className={styles.input}
                                    rows={5}
                                    required
                                />
                            </div>

                            {submitStatus === 'error' && (
                                <p className={styles.error}>
                                    There was an error sending your message.
                                    Please try again later.
                                </p>
                            )}

                            <button
                                type="submit"
                                className={styles.button}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Submit'}
                            </button>
                        </form>
                    )}
                </section>
            </main>
        </div>
    );
}
