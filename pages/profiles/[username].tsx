import Head from 'next/head';
import Header from '../components/Header';
import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

const UserPage = ({ username, bio, total, scores }) => {
    const [user, setUser] = useState('');
    // const [email, setEmail] = useState('');
    // const [steamID, setSteamID] = useState('');
    // const [discord, setDiscord] = useState('');
    // const [responseError, setResponseError] = useState('');
    // const [updateSuccess, setupdateSuccess] = useState('');

    const router = useRouter();

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
                <title>profile</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>
            <Header user={user} />
            <p>Username: {username}</p>
            <p>bio: {bio}</p>
            <h1> Total Score: {total}</h1>
            <h2> Breakdown: </h2>
            <div>
                {Object.entries(scores).map(([cat, val]) => (
                    <h3>
                        {cat}: {val[0]} percentile: {val[1]}
                    </h3>
                ))}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { username } = context.params as { username: string };
    try {
        const response = await fetch(
            `http://localhost:8000/profile/detailed/${username}`,
        );
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const data = await response.json();
        console.log(data);
        const bio = data.bio;
        const scores = data.scores;
        const total = data.total;
        console.log(scores);

        return {
            props: { username, bio, total, scores },
        };
    } catch (error) {
        console.log('error: ' + error);
        return {
            redirect: {
                destination: '/profiles/404', // Replace with your desired route
                permanent: false, // Set to true for a permanent redirect (301)
            },
        };
    }
};

export default UserPage;

//     async function getServerSideProps(context) {
//         // Extract any data you need from context, such as cookies or headers
//         const { req } = context;
//         const token = req.cookies.token; // Example: getting a token from cookies

//         try {
//             // Fetch user data from your backend
//             const res = await fetch('https://api.example.com/user', {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//                 },
//             });

//             if (!res.ok) {
//                 // Handle errors (e.g., user not authenticated)
//                 return {
//                     redirect: {
//                         destination: '/login', // Redirect to login page if not authenticated
//                         permanent: false,
//                     },
//                 };
//             }

//             const user = await res.json();

//             return {
//                 props: {
//                     user,
//                 },
//             };
//         } catch (error) {
//             console.error('Error fetching user data:', error);

//             // Optionally, handle errors by showing an error page or returning fallback props
//             return {
//                 props: {
//                     user: null, // Pass a null user in case of an error
//                 },
//             };
//         }
//     }
// }
