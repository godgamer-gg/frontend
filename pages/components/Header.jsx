// Filename - Header.js
 
import * as React from "react";
 
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import cookie from 'cookie';
 
export default function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                {}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/*This is a simple Menu 
                      Icon wrapped in Icon */}
                    <MenuIcon />
                </IconButton>
                {/* The Typography component applies 
                     default font weights and sizes */}
                <Button color="inherit" href='/'>Home</Button>
                <Button color="inherit" href='/About'>About</Button>
                <Button color='inherit' href='/Leaderboards'>Leaderboards</Button>
                <Button color='inherit' href='/Contact'>Contact</Button>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                </Typography>
                {1 == 1 ? (
                    <div>
                        <Button href='/CreateAccount' color='inherit'>Create Account</Button>
                        <Button href='/Login' color="inherit">Login</Button>
                    </div>
                ) : (
                    <div>
                        <Button href='/Profile' color='inherit'>Profile</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}