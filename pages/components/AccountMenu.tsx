import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from 'next/link';
import Logout from '@mui/icons-material/Logout';

export default function AccountMenu({ user = '' }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logout = async () => {
        const response = await fetch('/api/logout', { method: 'POST' });
        if (response.ok) {
            console.log('Logged out successfully');

            // reload the page should show the user has now logged out
            window.location.reload();
        }
    };

    const firstLetter =
        typeof user === 'string' && user.length > 0
            ? user.charAt(0).toUpperCase()
            : 'A';

    return (
        <React.Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{
                    ml: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar
                    sx={{
                        width: 32,
                        height: 32,
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: '#ffffff',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        fontWeight: 'bold',
                    }}
                >
                    {firstLetter}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.2))',
                            mt: 1.5,
                            backgroundColor: 'rgba(18, 18, 18, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: '#ffffff',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                color: '#ffffff',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                            },
                            '& .MuiMenuItem-root': {
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            },
                            '& .MuiListItemIcon-root': {
                                color: '#ffffff',
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'rgba(18, 18, 18, 0.95)',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderBottom: 'none',
                                borderRight: 'none',
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Link href="/update-profile" passHref legacyBehavior>
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                </Link>
                <Link href="/scoring/score-home" passHref legacyBehavior>
                    <MenuItem>
                        <Avatar /> Scores
                    </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
