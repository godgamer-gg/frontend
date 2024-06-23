import Head from 'next/head';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import Header from '../components/header';
import Button from '@mui/material/Button';
import Textfield from '@mui/material/TextField';
import React, {useState} from 'react'
import axios from 'axios'

export default function GetStarted() {
  const [steamCode, setSteamCode] = useState('')
  return (
    <div>
      <Head>
        <title>Calculate your steam score</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <main>
        <div>
          <Button href='./score-home' variant='outlined'> Back </Button>
          <h1> Steam Score Calculator</h1>
          <p> Enter your Steam ID Here: </p>
          <Textfield id='Steam ID' label='Steam ID' variant='outlined' 
            onChange={e => setSteamCode(e.target.value)}
          />
        </div>
        <p />
        
        <Button variant='contained'
            onClick={() => {
                submit(steamCode)
            }}
        >
            Submit
        </Button>
      </main>

    </div>
  );
}

async function submit(steamCode) {
  axios.get("http://127.0.0.1:8000/hello")
    .then((response) => {
      console.log(response);
    })
    .catch(error => console.log(error));
  // console.log("on submit")
  // const response = await fetch("http://localhost:8000", {
  //   method: "POST",
  //   headers: {'Content-Type': 'application/json'},
  //   body: steamCode
  // }).catch(error => console.error("Error.." + error));
  // console.log("Submitting")

  // axios.post("http://127.0.0.1:8000/steamscore/id", {user: "Guest", steamCode: steamCode})
  // .then((response) => {console.log(response);
  // }, (error) => {
  //   console.log(error)
  // });
  // axios({
  //   method: 'post',
  //   url: 'http://127.0.0.1:8000/steamscore/id',
  //   data: {
  //     user: 'Guest',
  //     steamCode: 'steamCode'
  //   }
  // });
}