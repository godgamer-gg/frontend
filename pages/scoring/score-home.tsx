import Head from 'next/head';
import styles from '../../styles/Page.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import SteamScore from './steam-score';
import RiotScore from './riot-score';
import { useRouter } from 'next/router';

interface ScoreEntry {
    [key: string]: [number, number, string] | undefined;
}

interface ScoreHistory {
    date: string;
    scores: ScoreEntry;
}

export default function Calculators() {
    const [user, setUser] = useState<string>('');
    const [steamCode, setSteamCode] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [scoresDict, setScoresDict] = useState<ScoreEntry>({});

    const router = useRouter();
    // State for total score and previous scores
    const [previousScores, setPreviousScores] = useState<ScoreHistory[]>([]);
    const [showPreviousScores, setShowPreviousScores] =
        useState<boolean>(false);

    // Fetch previous scores history
    const fetchPreviousScores = async () => {
        try {
            const response = await fetch('/api/get-score-history');
            if (response.ok) {
                const data = await response.json();
                setPreviousScores(data.scores || []);
            } else {
                console.error('Failed to fetch score history');
            }
        } catch (error) {
            console.error('Error fetching score history:', error);
        }
    };

    // Toggle previous scores display
    const togglePreviousScores = () => {
        if (!showPreviousScores) {
            fetchPreviousScores();
        }
        setShowPreviousScores(!showPreviousScores);
    };

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/current-user');
                if (response.ok) {
                    const data = await response.json();
                    const userInfo = data.user;
                    setUser(userInfo.username);
                    setEmail(userInfo.email || '');
                    setSteamCode(userInfo.steam || '');
                    setScoresDict(userInfo.scores || {});
                } else {
                    console.log('User is not logged in');
                    router.push('/');
                    return;
                }

                // Fetch user scores (deprecated)
                // const scoresResp = await fetch('/api/get-user-scores');
                // if (scoresResp.ok) {
                //     const data = await scoresResp.json();
                //     setScoresDict(data.user || {});
                // } else {
                //     console.log('Failed to fetch scores for user');
                // }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/');
            }
        };

        fetchSession();
    }, [router]);

    const submit = async () => {
        setStatus('Calculating... This can take a few minutes');
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
                setScoresDict(data.user || {});
                setStatus('Finished Calculating');
            } else {
                console.error(
                    'failed to get scores',
                    JSON.stringify(response, null, 2),
                    JSON.stringify(data, null, 2),
                );
                setError(data.message || 'Failed to calculate scores');
                setStatus('');
            }
        } catch (error) {
            console.error('fatal error calculating scores: ', error);
            setError('Server-side error occurred');
            setStatus('');
        }
    };

    return (
        <div>
            <Head>
                <title>Calculate Your Score</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={user} />

            <main className={styles.main}>
                <h1 className={styles.title}>Score Calculator</h1>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.heading}>Profile Information</h2>
                        <Link href="/update-profile">
                            <button className={styles.buttonSmall}>
                                Update Profile
                            </button>
                        </Link>
                    </div>
                    <p className={styles.text}>
                        Please review your information before calculating
                    </p>

                    <div className={styles.profileInfoCompact}>
                        <div className={styles.profileFieldCompact}>
                            <span className={styles.fieldLabel}>Username:</span>
                            <span className={styles.fieldValue}>{user}</span>
                        </div>
                        <div className={styles.profileFieldCompact}>
                            <span className={styles.fieldLabel}>Email:</span>
                            <span className={styles.fieldValue}>
                                {email || (
                                    <span className={styles.emptyField}>
                                        Not set
                                    </span>
                                )}
                            </span>
                        </div>
                        <div className={styles.profileFieldCompact}>
                            <span className={styles.fieldLabel}>Steam ID:</span>
                            <span className={styles.fieldValue}>
                                {steamCode || (
                                    <span className={styles.emptyField}>
                                        Not set
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <p className={styles.text}>
                        Click the button below to calculate your score based on
                        your linked accounts. This process may take a few
                        minutes to complete.
                    </p>

                    <div className={styles.centeredButtonContainer}>
                        <button className={styles.buttonLarge} onClick={submit}>
                            Calculate Score
                        </button>
                    </div>

                    {error && <p className={styles.error}>{error}</p>}
                    {status && <p className={styles.success}>{status}</p>}
                </section>

                {Object.keys(scoresDict).length > 0 && (
                    <section className={styles.section}>
                        <h2 className={styles.heading}>Score Breakdown</h2>

                        {/* Total Score Section */}
                        {scoresDict.total ? (
                            <div className={styles.totalScore}>
                                <h3 className={styles.subheading}>
                                    Total Score: {scoresDict.total[0] || 0}
                                </h3>
                                <div className={styles.scoreDetails}>
                                    <div className={styles.scorePercentile}>
                                        <span className={styles.scoreLabel}>
                                            Percentile:
                                        </span>
                                        {scoresDict.total[1] || 0}
                                    </div>
                                    <div className={styles.scoreGrade}>
                                        <span className={styles.scoreLabel}>
                                            Grade:
                                        </span>
                                        {scoresDict.total[2] || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.totalScore}>
                                <h3 className={styles.subheading}>
                                    Total Score: {scoresDict.total_score || 0}
                                </h3>
                            </div>
                        )}

                        <h3 className={styles.subheading}>Categories</h3>
                        <div className={styles.scoreBreakdown}>
                            {Object.entries(scoresDict)
                                .filter(
                                    ([key]) =>
                                        key !== 'total' &&
                                        key !== 'total_score',
                                )
                                .map(([key, values]) => (
                                    <div
                                        key={key}
                                        className={styles.scoreEntry}
                                    >
                                        <div className={styles.scoreCategory}>
                                            {key}
                                        </div>
                                        <div className={styles.scoreDetails}>
                                            <div className={styles.scoreValue}>
                                                <span
                                                    className={
                                                        styles.scoreLabel
                                                    }
                                                >
                                                    Score:
                                                </span>
                                                {values?.[0] || 0}
                                            </div>
                                            <div
                                                className={
                                                    styles.scorePercentile
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.scoreLabel
                                                    }
                                                >
                                                    Percentile:
                                                </span>
                                                {values?.[1] || 0}
                                            </div>
                                            <div className={styles.scoreGrade}>
                                                <span
                                                    className={
                                                        styles.scoreLabel
                                                    }
                                                >
                                                    Grade:
                                                </span>
                                                {values?.[2] || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </section>
                )}

                <section className={styles.section}>
                    <h2 className={styles.heading}>Score History [WIP]</h2>

                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.button}
                            onClick={togglePreviousScores}
                        >
                            {showPreviousScores
                                ? 'Hide History'
                                : 'Show History'}
                        </button>
                    </div>

                    {showPreviousScores && (
                        <div className={styles.scoreHistory}>
                            {previousScores.length > 0 ? (
                                previousScores.map((entry, index) => (
                                    <div
                                        key={index}
                                        className={styles.historyEntry}
                                    >
                                        <h3 className={styles.subheading}>
                                            {entry.date}
                                        </h3>
                                        <div className={styles.scoreBreakdown}>
                                            {Object.entries(entry.scores).map(
                                                ([key, values]) => (
                                                    <div
                                                        key={key}
                                                        className={
                                                            styles.scoreEntry
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.scoreCategory
                                                            }
                                                        >
                                                            {key}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.scoreDetails
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.scoreValue
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.scoreLabel
                                                                    }
                                                                >
                                                                    Score:
                                                                </span>
                                                                {values?.[0] ||
                                                                    0}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.scorePercentile
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.scoreLabel
                                                                    }
                                                                >
                                                                    Percentile:
                                                                </span>
                                                                {values?.[1] ||
                                                                    0}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.scoreGrade
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        styles.scoreLabel
                                                                    }
                                                                >
                                                                    Grade:
                                                                </span>
                                                                {values?.[2] ||
                                                                    'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.text}>
                                    No score history available.
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
