import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import Header from './components/header';
import React, { useState } from 'react'

export default function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userError, setUserError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const onButtonClick = () => {
    // Set initial error values to empty
    setUserError('')
    setPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === username) {
      setUserError('Please enter a username')
      return
    }
    
    // case were an email is entered instead
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
      const user = findUser(username)
      if ('' === user) {
        setUserError('Could not find a username with that email')
        return
      }
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
    
    verifyLogin(username, password)
  }

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/Controller.svg" />
      </Head>
      
      <Header />
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={username}
            placeholder="Enter your email or username here"
            onChange={(ev) => setUsername(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{userError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
        </div>
    </div>
  </div>
  );
}

async function findUser(email) {
  console.log("searching for username from email: ", email)

  try {
    const response = await fetch("search/username-from-email/" + email, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
    }
    });
    if (response.ok) {
      const data = await response.json();
      console.log('found username ', data)
    } 
  } catch (error) {
    console.error('Error during login: ', error)
  }
}

async function verifyLogin(username, password) {
  console.log("logging in: ", username, password)
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch("http://localhost:8000/auth", {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log("logged in, server response: ", data);
      return data;
    } else {
      console.error('failed to log in: ', JSON.stringify(response, null, 2));
      return '';
    }
  } catch (error) {
    console.error('Error during login: ', error)
    return '';
  }
}