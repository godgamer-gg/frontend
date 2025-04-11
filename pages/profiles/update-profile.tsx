import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Page.module.css';

export default function UpdateProfile() {
    // const [formData, setFormData] = useState({
    //     username: '',
    //     email: '',
    //     steamID: '',
    //     discord: '',
    //     bio: '',
    // });
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [steamID, setSteamID] = useState('');
    const [discord, setDiscord] = useState('');
    const [bio, setBio] = useState('');
    const [showEmail, setShowEmail] = useState(false);
    const [showDiscord, setShowDiscord] = useState(false);
    const [responseError, setResponseError] = useState('');
    const [updateSuccess, setupdateSuccess] = useState('');
    const router = useRouter();

    // Load user info on page load, this also checks user session so deviating from normal pattern
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/current-user');
            if (response.ok) {
                const data = await response.json();
                const userInfo = data.user;
                setUsername(userInfo.username);
                setEmail(userInfo.email);
                setSteamID(userInfo.steam);
                setDiscord(userInfo.discord);
                setBio(userInfo.bio);
                setShowEmail(userInfo.show_email || false);
                setShowDiscord(userInfo.show_discord || false);

                // setFormData({
                //     username: userInfo.username,
                //     email: userInfo.email,
                //     steamID: userInfo.steam,
                //     discord: userInfo.discord,
                //     bio: userInfo.bio,
                // });
                console.log('data received: ', data);
            } else {
                console.log('User is not logged in');
                // users not logged in should be sent to the home page
                router.push('/');
            }
        };

        fetchSession();
    }, []);

    // submits all of the info for the user and the server handles any changes
    const submit = async (e) => {
        e.preventDefault();
        setResponseError('');
        setupdateSuccess('');
        try {
            console.log('submitting formData: ');
            const response = await fetch('/api/update-profile', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    email,
                    ['steam_id']: `${steamID}`,
                    discord,
                    bio,
                    show_email: showEmail,
                    show_discord: showDiscord,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const data = await response.json();
            if (response.ok) {
                console.log('profile updated, server response: ', data);
                setupdateSuccess('Account updated successfully');
            } else {
                console.log('bad response message: ', data.message);
                setResponseError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error during profile update: ', error);
            setResponseError('An unexpected error occurred');
        }
    };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setFormData((prevState) => ({ ...prevState, [name]: value }));
    // };

    // TODO: add spacing to make the form pretty
    return (
        <div>
            <Head>
                <title>Update Profile</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={username} />

            <main className={styles.main}>
                <h1 className={styles.title}>Edit Your Profile</h1>
                <section className={styles.section}>
                    <form className={styles.form} onSubmit={submit}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithCheckbox}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="showEmail"
                                        checked={showEmail}
                                        onChange={() =>
                                            setShowEmail(!showEmail)
                                        }
                                        className={styles.checkbox}
                                    />
                                    <label
                                        htmlFor="showEmail"
                                        className={styles.checkboxLabel}
                                    >
                                        Make public
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Steam ID:</label>
                            <input
                                type="text"
                                name="steam"
                                value={steamID}
                                onChange={(e) => setSteamID(e.target.value)}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.inputWithCheckbox}>
                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Discord:
                                    </label>
                                    <input
                                        type="text"
                                        name="discord"
                                        value={discord}
                                        onChange={(e) =>
                                            setDiscord(e.target.value)
                                        }
                                        className={styles.input}
                                    />
                                </div>
                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="showDiscord"
                                        checked={showDiscord}
                                        onChange={() =>
                                            setShowDiscord(!showDiscord)
                                        }
                                        className={styles.checkbox}
                                    />
                                    <label
                                        htmlFor="showDiscord"
                                        className={styles.checkboxLabel}
                                    >
                                        Make public
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Bio:</label>
                            <textarea
                                name="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className={styles.input}
                                rows={4}
                            />
                        </div>

                        <button type="submit" className={styles.button}>
                            Update Profile
                        </button>

                        {responseError && !updateSuccess && (
                            <p className={styles.error}>{responseError}</p>
                        )}
                        {updateSuccess && !responseError && (
                            <p className={styles.success}>{updateSuccess}</p>
                        )}
                    </form>
                </section>
            </main>
        </div>
    );
}
