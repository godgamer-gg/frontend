import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

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
                // setResponseError(data.message);
            }
        } catch (error) {
            console.error('Error during profile update: ', error);
            setResponseError(error);
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
                <title>Create an Account</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={username} />

            <h2> Edit your profile </h2>
            <form onSubmit={submit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Steam ID:
                    <input
                        type="text"
                        name="steam"
                        value={steamID}
                        onChange={(e) => setSteamID(e.target.value)}
                    />
                </label>
                <label>
                    Discord:
                    <input
                        type="text"
                        name="discord"
                        value={discord}
                        onChange={(e) => setDiscord(e.target.value)}
                    />
                </label>
                <br></br>
                <label>
                    Bio:
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                </label>
                <br></br>
                <button type="submit">Update</button>
                <div>
                    {responseError && !updateSuccess && (
                        <p style={{ color: 'red' }}>{responseError}</p>
                    )}
                    {updateSuccess && !responseError && (
                        <p style={{ color: 'green' }}>{updateSuccess}</p>
                    )}
                </div>
            </form>
        </div>
    );
}
