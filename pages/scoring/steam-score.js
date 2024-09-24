'use client'

import Head from 'next/head';
import Header from '../components/Header';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Textfield from '@mui/material/TextField';
import React, {Component, useState} from 'react';

export default function SteamScore() { 
  const [steamCode, setSteamCode] = useState('0')
  const [friendCode, setFriendCode] = useState('0')
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
        <div>
            Enter your Steam ID Here:
            <Textfield id='Steam ID' label='Steam ID' variant='outlined' onChange={(event) => setSteamCode(event.target.value)} />
        </div>
        <div>
            Your steam ID is not your friend code or your username. You can enter your friend code here instead:
            <Textfield id='Friendcode' label='Steam Friendcode' variant='outlined' onChange={() => setFriendCode(friendCode)}/>
        </div>
          <Button variant='contained'
            onClick={() => {
              console.log("submit")
                submit(steamCode, friendCode)
            }}
        >
            Submit
        </Button>
      </main>

    </div>

  );
}


async function submit(steamCode, friendCode) {
  console.log(steamCode, friendCode)
  let url = "http://localhost:8000/steamscore/"
  if (steamCode != '0') {
    url = url + 'steamCode/' + steamCode
  } else if (friendCode != '0') {
    url = url + 'friendCode' + friendCode
  } else {
    return
  }
  try{
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
      const resp_data = await response.json();
      console.log(resp_data)
    } else {
      console.error("failed to get steam score", JSON.stringify(response, null, 2))
    }
  } catch (error) {
    console.error("fatal error getting steam score: ", error)
  }
}