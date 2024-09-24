import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';

export default function Leaderboards() {
  return (
    <div>
      <Head>
        <title>Leaderboards</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <h1> Leaderboards will go here</h1>
    </div>
  );
}