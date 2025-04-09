import Head from 'next/head';
import Header from '../components/Header';
import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import styles from '../../styles/Page.module.css';
import Link from 'next/link';

interface ScoreEntry {
    [key: string]: [number, number, string] | undefined;
}

interface UserInfo {
    username: string;
    email: string;
    steam: string;
    bio: string;
    discord: string;
    score_summary: ScoreEntry;
    show_email?: boolean;
    show_discord?: boolean;
}

const MyProfile: React.FC = () => {
    const [user, setUser] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [steamCode, setSteamCode] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [discord, setDiscord] = useState<string>('');
    const [scores, setScores] = useState<ScoreEntry>({});
    const [showEmail, setShowEmail] = useState<boolean>(false);
    const [showDiscord, setShowDiscord] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch('/api/current-user');
                if (response.ok) {
                    const data = await response.json();
                    const userInfo: UserInfo = data.user;
                    setUser(userInfo.username);
                    setEmail(userInfo.email || '');
                    setSteamCode(userInfo.steam || '');
                    setBio(userInfo.bio || '');
                    setDiscord(userInfo.discord || '');
                    setScores(userInfo.score_summary || {});
                    setShowEmail(userInfo.show_email || false);
                    setShowDiscord(userInfo.show_discord || false);
                } else {
                    console.log('User is not logged in');
                    router.push('/');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/');
            }
        };
        fetchSession();
    }, [router]);

    return (
        <div>
            <Head>
                <title>{user}'s Profile</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={user} />

            <main className={styles.main}>
                <h1 className={styles.title}>My Profile</h1>

                <section className={styles.section}>
                    <h2 className={styles.heading}>Profile Information</h2>
                    <div className={styles.profileInfo}>
                        <p className={styles.profileField}>
                            <span className={styles.fieldLabel}>Username:</span>
                            <span className={styles.fieldValue}>{user}</span>
                        </p>

                        {email && (
                            <p className={styles.profileField}>
                                <span className={styles.fieldLabel}>
                                    Email:
                                </span>
                                <span className={styles.fieldValue}>
                                    {email}
                                </span>
                                <span className={styles.visibilityStatus}>
                                    {showEmail ? '(Public)' : '(Private)'}
                                </span>
                            </p>
                        )}

                        {steamCode && (
                            <p className={styles.profileField}>
                                <span className={styles.fieldLabel}>
                                    Steam ID:
                                </span>
                                <span className={styles.fieldValue}>
                                    {steamCode}
                                </span>
                            </p>
                        )}

                        {discord && (
                            <p className={styles.profileField}>
                                <span className={styles.fieldLabel}>
                                    Discord:
                                </span>
                                <span className={styles.fieldValue}>
                                    {discord}
                                </span>
                                <span className={styles.visibilityStatus}>
                                    {showDiscord ? '(Public)' : '(Private)'}
                                </span>
                            </p>
                        )}

                        {bio && (
                            <div className={styles.profileField}>
                                <span className={styles.fieldLabel}>Bio:</span>
                                <p className={styles.bio}>{bio}</p>
                            </div>
                        )}

                        <div className={styles.buttonContainer}>
                            <Link href="/update-profile">
                                <button className={styles.button}>
                                    Edit Profile
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.heading}>Score</h2>

                    {scores && Object.keys(scores).length > 0 ? (
                        <div className={styles.scoreContainer}>
                            {scores.total && (
                                <div className={styles.totalScore}>
                                    <h3 className={styles.subheading}>
                                        Total Score: {scores.total[0]}
                                    </h3>
                                </div>
                            )}

                            <h3 className={styles.subheading}>
                                Score Breakdown
                            </h3>
                            <div className={styles.scoreBreakdown}>
                                {Object.entries(scores)
                                    .filter(([key]) => key !== 'total')
                                    .map(([key, values]) => (
                                        <div
                                            key={key}
                                            className={styles.scoreEntry}
                                        >
                                            <div
                                                className={styles.scoreCategory}
                                            >
                                                {key}
                                            </div>
                                            <div
                                                className={styles.scoreDetails}
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
                                                    </span>{' '}
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
                                                    </span>{' '}
                                                    {values?.[1] || 0}
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
                                                    </span>{' '}
                                                    {values?.[2] || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <p className={styles.text}>
                            No scores available yet. Start playing to earn your
                            rank!
                        </p>
                    )}
                    <div className={styles.buttonContainer}>
                        <Link href="/scoring/score-home">
                            <button className={styles.button}>
                                Calculate Scores
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default MyProfile;
