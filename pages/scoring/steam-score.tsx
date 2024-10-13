'use client';

import Head from 'next/head';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

export default function SteamScore() {
    const [steamCode, setSteamCode] = useState('0');
    const [friendCode, setFriendCode] = useState('0');
    const [steamScore, setSteamScore] = useState('');

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

    const submitCallback = (score) => {
        setSteamScore(score);
    };

    return (
        <div>
            <Head>
                <title>Calculate your steam score</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <main>
                <Button href="./score-home" variant="outlined">
                    {' '}
                    Back{' '}
                </Button>
                <h1> Steam Score Calculator</h1>
                <a>Enter your Steam ID Here: (Seperate from your steam code)</a>
                <div>
                    <Textfield
                        id="Steam ID"
                        label="Steam ID"
                        variant="outlined"
                        onChange={(event) => setSteamCode(event.target.value)}
                    />
                </div>
                {/* <div>
                    Your steam ID is not your friend code or your username. You
                    can enter your friend code here instead:
                    <Textfield
                        id="Friendcode"
                        label="Steam Friendcode"
                        variant="outlined"
                        onChange={() => setFriendCode(friendCode)}
                    />
                </div> */}
                <Button
                    variant="contained"
                    onClick={() => {
                        console.log('submit');
                        setSteamScore('Calculating...');
                        submit(steamCode, friendCode, submitCallback);
                    }}
                >
                    Submit
                </Button>

                {steamScore && <a> Your Steam Score is: {steamScore} </a>}
            </main>
        </div>
    );
}

async function submit(steamCode, friendCode, callback) {
    console.log(steamCode, friendCode);
    let url = 'http://localhost:8000/steamscore/';
    if (steamCode != '0') {
        url = url + 'steamCode/' + steamCode;
    } else if (friendCode != '0') {
        url = url + 'friendCode' + friendCode;
    } else {
        return;
    }
    try {
        // probably should add token verification and run this through middleware
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const resp_data = await response.json();
            console.log(resp_data);
            callback(resp_data);
        } else {
            console.error(
                'failed to get steam score',
                JSON.stringify(response, null, 2),
            );
        }
    } catch (error) {
        console.error('fatal error getting steam score: ', error);
    }
}
