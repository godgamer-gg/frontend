import Head from 'next/head';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter();
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            const response = await fetch('/api/session');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                console.log('User is not logged in');
                // redirect users not logged in to home
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

            <Header />
            <h1> Profile info will go here</h1>

            {/* <Footer /> */}
        </div>
    );
}
