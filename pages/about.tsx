import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';

export default function About() {
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
            <Head>
                <title>About The Ultimate Gamer Rank</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header user={user} />
            <main>
                {/* TODO: Add styling */}
                <h3>Purpose: </h3>
                <p>
                    {' '}
                    This project was founded to help unify esports and
                    competitive gaming, and to answer the question of who are
                    the greatest gamers of our time. We would like a platform
                    for people to be able to flaunt their achivements, and to
                    find avenues to compete and prove themselves.
                </p>

                <h3> Methodology: </h3>
                <p>
                    {' '}
                    Your total score is a sum of your highest achieved ranks in
                    each game, your achievements on each gaming platform, and
                    results in tournaments on this platform and others.{' '}
                </p>
                <h4>Achievement Scores:</h4>
                <p>
                    Your score for achievements are calculated based on the
                    rarity and popularity of games. This increases exponentially
                    based on the rarity of the achievement (% completion) and
                    linearly based on the popularity of the game. Our goal is to
                    offer this calculation for every platform, but currently we
                    can only do steam.
                </p>
                <h4>Ranked Game Scores:</h4>
                <p>
                    {' '}
                    Currently we are added support for as many games with a
                    ranked feature as we can. Ranked games are weighted such
                    that you get an increased score the higher your rank is in a
                    game and to try and best translate accross different ranking
                    systems. For example hitting the highest rank in one game is
                    worth approximately double hitting the second highest rank
                    in two different games. This score is also scaled by the
                    popularity of the game.
                </p>
                <h4>Tournament Scores:</h4>
                <p>
                    While not currently offered, long term we would like to
                    allow users to input their tournament profiles on other
                    websites, along with host online tournaments of our own,
                    where users will earn lots of points towards their overall
                    score
                </p>
                <h3>Contribution:</h3>
                <p>
                    This project isn't completely open source at the moment, and
                    we're not sure if it will be or not. However we anybody who
                    is interested in contributing to the project is more than
                    welcome. Just head over to the contact page and shoot us a
                    message!
                </p>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
