import Head from 'next/head';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export default function Profile() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        steamID: '',
        discord: '',
        bio: '',
    });

    // Load user info on page load, this also checks user session so deviating from normal pattern
    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/current-user');
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    username: data.user,
                    email: data.email,
                    steamID: data.steamID,
                    discord: data.discord,
                    bio: data.bio,
                });
            } else {
                console.log('User is not logged in');
                // users not logged in should be sent to the home page
                router.push('/');
            }
        };

        fetchSession();
    }, []);
    return (
        <div>
            <Head>
                <title>Contact</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={formData.username} />
            <h1> Profile info will go here</h1>

            <Button href="/update-profile" variant="contained">
                Update Profile Info
            </Button>

            {/* <Footer /> */}
        </div>
    );
}
