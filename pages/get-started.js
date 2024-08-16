import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/header';
import Button from '@mui/material/Button';

export default function GetStarted() {
  return (
    <div>
      <Head>
        <title>Getting Started</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <h1> Let's Get Started!</h1>

      <Button href='/login' variant='contained'>
        Login
      </Button>

      <Button href='/account-creation' variant='contained'>
        Create Account
      </Button>

      <Button href='/scoring/score-home' variant='contained'>
        Continue as guest
      </Button>
    </div>
  );
}