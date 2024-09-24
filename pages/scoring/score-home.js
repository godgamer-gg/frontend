import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/Header';
import Button from '@mui/material/Button';

export default function Calculators() {
  return (
    <div>
      <Head>
        <title>Calculate your score</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <h1> Score calculators</h1>

      <Button href='./steam-score' variant='contained'>
        Steam Account
      </Button>


    </div>
  );
}