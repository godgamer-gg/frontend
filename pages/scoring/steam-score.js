import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/header';
import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';

export default function GetStarted() {
  return (
    <div>
      <Head>
        <title>Calculate your steam score</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <main>
        <Button href='./score-home' variant='outlined'> Back </Button>
        <h1> Steam Score Calculator</h1>
        <p>
            Enter your Steam ID Here:
            <Textfield id='Steam ID' label='Steam ID' variant='outlined' />
        </p>
        <p>
            Your steam ID is not your friend code or your username. You can enter your friend code here instead:
            <Textfield id='Freidncode' label='Steam Friendcode' variant='outlined' />
        </p>
        <Button variant='contained'
            onClick={() => {
                submit()
            }}
        >
            Submit
        </Button>
      </main>

    </div>
  );
}

async function submit() {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    console.log(data)
}