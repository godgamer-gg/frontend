import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/header';

export default function GetStarted() {
  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <h1> TODO</h1>
    </div>
  );
}