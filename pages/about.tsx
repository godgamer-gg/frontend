import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

export default function About() {
    return (
        <div>
            <Head>
                <title>About The Ultimate Gamer Rank</title>
                <link rel="icon" href="/Controller.svg" />
            </Head>

            <Header />
            <main>
                <h1> TODO</h1>
            </main>

            {/* <Footer /> */}
        </div>
    );
}
