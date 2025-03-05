// Filename - Header.js

import { useState } from 'react';

// importing material UI components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from './AccountMenu';

import SearchBar from './searchBar';

export default function Header(props) {
    return (
        <AppBar
            position="static"
            sx={{
                background: 'rgba(18, 18, 18, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar>
                <Button
                    color="inherit"
                    href="/"
                    sx={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Home
                </Button>
                <Button
                    color="inherit"
                    href="/about"
                    sx={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    About
                </Button>
                <Button
                    color="inherit"
                    href="/leaderboards"
                    sx={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Leaderboards
                </Button>
                <Button
                    color="inherit"
                    href="/contact"
                    sx={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Contact
                </Button>
                <Button
                    color="inherit"
                    href="/search"
                    sx={{
                        color: '#ffffff',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'rgba(255, 255, 255, 0.8)',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                            transform: 'translateY(-1px)',
                        },
                    }}
                >
                    Search
                </Button>
                {/* search bar looks terrible right now so instead we are using search page */}
                {/* <SearchBar /> */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                ></Typography>
                {props.user === '' ? (
                    <div>
                        <Button
                            href="/create-account"
                            sx={{
                                color: '#ffffff',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                fontWeight: 'bold',
                                marginRight: '1rem',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: '1px solid rgba(255, 255, 255, 0.6)',
                                    transform: 'translateY(-1px)',
                                    boxShadow:
                                        '0 4px 8px rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Create Account
                        </Button>
                        <Button
                            href="/login"
                            sx={{
                                color: '#ffffff',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 255, 255, 0.6)',
                                    transform: 'translateY(-1px)',
                                    boxShadow:
                                        '0 4px 8px rgba(255, 255, 255, 0.2)',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </div>
                ) : (
                    <div>
                        <AccountMenu user={props.user} />
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

Header.defaultProps = {
    user: '',
};

{
    /* <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                > */
}
{
    /*This is a simple Menu 
                      Icon wrapped in Icon */
}
{
    /* <MenuIcon /> */
}
{
    /* </IconButton> */
}
{
    /* The Typography component applies 
                     default font weights and sizes */
}
