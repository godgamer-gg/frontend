import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Header from './components/Header';
import Leaderboard from './components/Leaderboard';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

export default function Leaderboards() {
    const [user, setUser] = useState('');
    const [category, setCategory] = useState('Total');
    const [allCategories, setAllCategories] = useState(['']);
    const [LBData, setLBData] = useState([['']]);

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
        fetchData(category);
    }, []);

    // perhaps this should be a GET instead but would need to rework slightly
    const fetchData = async (category) => {
        // Fetch data from external API
        const res = await fetch(
            'http://localhost:8000/leaderboard-data/' + category,
        );
        const data = await res.json();
        console.log(data);
        setAllCategories(data.categories);
        setLBData(data.data);
    };

    return (
        <div>
            <Head>
                <title>Leaderboards</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <br></br>
            <br></br>

            {/* need to center this somehow, also style buttons */}
            <div>
                {allCategories.map((item, index) => (
                    <Button
                        key={index}
                        name={item}
                        variant="contained"
                        onClick={() => {
                            setCategory(item);
                            fetchData(item);
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </div>

            <div>
                <Leaderboard cat={category} data={LBData} />
            </div>
        </div>
    );
}
