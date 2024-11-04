import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SteamScore from './steam-score';
import RiotScore from './riot-score';
import { useRouter } from 'next/router';

export default function Calculators() {
    const [user, setUser] = useState('');
    const [steamCode, setSteamCode] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const [scoresDict, setScoresDict] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/current-user');
            if (response.ok) {
                const data = await response.json();
                const userInfo = data.user;
                setUser(userInfo.username);
                setEmail(userInfo.email);
                setSteamCode(userInfo.steam);
            } else {
                console.log('User is not logged in');
                router.push('/');
            }
            // these two api calls could be combined but this is easier for now
            const scoresResp = await fetch('/api/get-user-scores');
            if (scoresResp.ok) {
                const data = await scoresResp.json();
                setScoresDict(data.user);
            } else {
                console.log('failed to fetch scores for user');
            }
        };

        fetchSession();
    }, []);

    const submit = async () => {
        setStatus('Calculating...This can take a few minutes');
        setError('');
        try {
            const response = await fetch('/api/calculate-all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('scores received: ', data);
                setScoresDict(data.user);
                setStatus('Finished Calculating');
            } else {
                console.error(
                    'failed to get scores',
                    JSON.stringify(response, null, 2),
                    JSON.stringify(data, null, 2),
                );
                setError(data.message);
                setStatus('');
            }
        } catch (error) {
            console.error('fatal error calculating scores: ', error);
            setError('server side error');
            setStatus('');
        }
    };

    return (
        <div>
            <Head>
                <title>Calculate your score</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={user} />
            <h1> User Score Calculation </h1>
            <h2> Review your info: </h2>
            <div
                style={{
                    border: '1px solid #ddd',
                    padding: '16px',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                }}
            >
                <p>
                    <strong>Name:</strong> {user}
                </p>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Steam Code:</strong> {steamCode}
                </p>
                <Button variant="contained" href="/update-profile">
                    edit
                </Button>
            </div>

            <br></br>
            <Button
                variant="contained"
                onClick={() => {
                    console.log('submit');
                    submit();
                }}
            >
                Calculate
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {status && <p style={{ color: 'green' }}>{status}</p>}
            {/* <SteamScore />
            <RiotScore /> */}
            <h2>Score Breakdown: </h2>
            {/* TODO: sum scores from above components to get total score */}
            <div>
                {Object.entries(scoresDict).map(([key, value]) => (
                    <TextField
                        id={key}
                        label={key}
                        value={value || 0}
                        margin="normal"
                        variant="filled"
                    />
                ))}
            </div>
        </div>
    );
}
