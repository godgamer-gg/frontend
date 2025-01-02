import Head from 'next/head';
import Header from '../components/Header';
import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';

const UserPage = ({ username }: { username: string }) => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [steamID, setSteamID] = useState('');
    const [discord, setDiscord] = useState('');
    const [bio, setBio] = useState('');
    const [responseError, setResponseError] = useState('');
    const [updateSuccess, setupdateSuccess] = useState('');

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
        const fetchUserData = async () => {
            console.log(username);
        };

        fetchSession();
        fetchUserData();
    }, []);

    return (
        <div>
            <Head>
                <title>profile</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <h1>Username</h1>

            {/* <Footer /> */}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { username } = context.params as { username: string };

    return {
        props: { username }, // Pass username as a prop
    };
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
