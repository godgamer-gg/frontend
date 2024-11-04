import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SteamScore from './steam-score';
import RiotScore from './riot-score';

export default function Calculators() {
    const [user, setUser] = useState('');
    // const [totalScore, setTotalScore] = useState('0');
    const [steamScore, setSteamScore] = useState('0');
    const [riotScore, setRiotScore] = useState('0');

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
                <title>Calculate your score</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={user} />
            <h1> Calculator your score!</h1>
            <br></br>
            <SteamScore user={''} setter={setSteamScore} />
            <RiotScore />
            // TODO: sum scores from above components to get total score
            {/* <TextField
                id="Total Score"
                label="Total Score"
                value={steamScore + riotScore}
                margin="normal"
                variant="filled"
            ></TextField> */}
        </div>
    );
}
