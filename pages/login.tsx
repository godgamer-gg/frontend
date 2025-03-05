import Head from 'next/head';
import Header from './components/Header';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Page.module.css';

interface LoginResponse {
    message: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userError, setUserError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');
    const [responseError, setResponseError] = useState<string>('');

    const router = useRouter();

    const handleResponseError = (error: string): void => {
        console.log('response error: ', error);
        setResponseError(error);
    };

    const handleLoginSuccess = (): void => {
        router.push('/');
    };

    const onButtonClick = (): void => {
        setUserError('');
        setPasswordError('');
        setResponseError('');

        if (username === '') {
            setUserError('Please enter a username');
            return;
        }

        if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
            findUser(username).then((user) => {
                if (user === '') {
                    setUserError('Could not find a username with that email');
                    return;
                }
            });
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }

        verifyLogin(
            username,
            password,
            handleResponseError,
            handleLoginSuccess,
        );
    };

    return (
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user="" />
            <main className={styles.main}>
                <section className={styles.section}>
                    <h1 className={styles.title}>Login</h1>
                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <input
                                value={username}
                                placeholder="Enter your email or username here"
                                onChange={(ev) => setUsername(ev.target.value)}
                                className={styles.input}
                            />
                            {userError && (
                                <label className={styles.error}>
                                    {userError}
                                </label>
                            )}
                        </div>

                        <div className={styles.formGroup}>
                            <input
                                type="password"
                                value={password}
                                placeholder="Enter your password here"
                                onChange={(ev) => setPassword(ev.target.value)}
                                className={styles.input}
                            />
                            {passwordError && (
                                <label className={styles.error}>
                                    {passwordError}
                                </label>
                            )}
                        </div>

                        {responseError && (
                            <p className={styles.error}>{responseError}</p>
                        )}

                        <button
                            className={styles.button}
                            type="button"
                            onClick={onButtonClick}
                        >
                            Log in
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

async function findUser(email: string): Promise<string> {
    console.log('searching for username from email: ', email);

    try {
        const response = await fetch('search/username-from-email/' + email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('found username ', data);
            return data.username || '';
        }
    } catch (error) {
        console.error('Error during login: ', error);
    }
    return '';
}

async function verifyLogin(
    username: string,
    password: string,
    errorCallback: (error: string) => void,
    successCallback: () => void,
): Promise<void> {
    console.log('logging in: ', username);

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data: LoginResponse = await response.json();
        if (response.ok) {
            console.log('logged in, server response: ', data);
            successCallback();
        } else {
            console.log('failed to log in: ', data);
            errorCallback(data.message);
        }
    } catch (error) {
        console.error('Error during login: ', error);
        errorCallback('An unexpected error occurred');
    }
}

export default Login;
