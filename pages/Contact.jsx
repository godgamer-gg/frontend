import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/Header';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <h1> Contact info will go here</h1>
    </div>
  );
}