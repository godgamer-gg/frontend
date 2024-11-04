'use client';

import Head from 'next/head';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

// TODO: Change behavior to automatically handle when user is already logged in
export default function SteamScore(props) {
    const [steamCode, setSteamCode] = useState('0');
    const [friendCode, setFriendCode] = useState('0');
    const [steamScore, setSteamScore] = useState('');

    const submitCallback = (score) => {
        setSteamScore(score);
        props.setter(score);
    };

    return (
        <div>
            <main>
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
                        submit(steamCode, props.user, submitCallback);
                    }}
                >
                    Submit
                </Button>

                {steamScore && <a> Your Steam Score is: {steamScore} </a>}
            </main>
        </div>
    );
}

async function submit(steamCode, user, callback) {
    if (steamCode === '0') {
        return;
    }

    try {
        var response;
        if (user === '') {
            response = await fetch('api/guest-steam-score/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(steamCode),
            });
        } else {
            response = await fetch('api/user-steam-score/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
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
