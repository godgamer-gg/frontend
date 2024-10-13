import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function ProfileSetup() {
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

    return (
        <div>
            <Header user={user} />

            <h1> Setup your profile </h1>
        </div>
    );
}
