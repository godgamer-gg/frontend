import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userError, setUserError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [responseError, setResponseError] = useState('');

    const router = useRouter();

    const onButtonClick = () => {
        // Set initial error values to empty
        setUserError('');
        setPasswordError('');
        setEmailError('');
        setConfirmPasswordError('');
        setResponseError('');

        // Check if the user has entered all fields correctly
        if ('' === username) {
            setUserError('Please enter a username');
            return;
        }
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        if ('' === password) {
            setPasswordError('Please enter a password');
            return;
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords must match');
            return;
        }

        if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            return;
        }
        console.log(username, email, password);
        createAccount(
            username,
            email,
            password,
            handleResponseError,
            successCallback,
        );
    };

    const handleResponseError = (error) => {
        console.log('response error: ', error);
        setResponseError(error);
    };

    // on successful account creation, login the user then route them to update-profile
    const successCallback = () => {
        router.push('/update-profile');
    };

    return (
        <div>
            <Head>
                <title>Create an Account</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header />
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Create an Account</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    username: &nbsp;
                    <input
                        value={username}
                        placeholder="Enter your username here"
                        onChange={(ev) => setUsername(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{userError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    email: &nbsp;
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    password: &nbsp;
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className={'inputContainer'}>
                    confirm password: &nbsp;
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="confirm your password"
                        onChange={(ev) => setConfirmPassword(ev.target.value)}
                        className={'inputBox'}
                    />
                    <label className="errorLabel">{confirmPasswordError}</label>
                </div>
                <br />
                <div>
                    {responseError && (
                        <p style={{ color: 'red' }}>{responseError}</p>
                    )}
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        className={'inputButton'}
                        type="button"
                        onClick={onButtonClick}
                        value={'Create Account'}
                    />
                </div>
            </div>
        </div>
    );
}

async function createAccount(
    username,
    email,
    password,
    errorCallback,
    successCallback,
) {
    console.log('creating account: ', username, email, password);
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        if (response.ok) {
            console.log('account created, server response: ', data);
            successCallback();
        } else {
            console.log(data.message);
            errorCallback(data.message);
        }
    } catch (error) {
        console.error('Error during account creation: ', error);
        errorCallback(error);
        return '';
    }
}
