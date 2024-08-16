import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react'
import Button from '@mui/material/Button';
import Header from './components/header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ultimate Gamer Rank</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>

      <Header />

      <main>
        <h1 className={styles.title}>
          The Ultimate Gamer Rank
        </h1>
        <Button href="/get-started" variant='contained'>
          <p className={styles.description}>
            Get started
          </p>
        </Button>
      </main>

      <footer>
        <a
          href="https://twitter.com/InvictusZSS"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Nick Armstrong
          <img src="/twitter.png" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
