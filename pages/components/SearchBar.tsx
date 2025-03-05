import React, { FunctionComponent, useState, useEffect } from 'react';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { useRouter } from 'next/router';

const SearchBar: FunctionComponent = () => {
    const router = useRouter();

    const [showClearIcon, setShowClearIcon] = useState('none');
    const [query, setQuery] = useState('');

    // below line currently generates a warning, fix soon
    // doesn't seem to affect functionality
    const handleChange = (e): void => {
        setShowClearIcon(e.target.value === '' ? 'none' : 'flex');
        setQuery(e.target.value);
    };

    // goal of this is to query the server for autofill
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            console.log(query);
        }, 3000);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSearch = async () => {
        console.log('handle search');

        if (router.pathname === '/search') {
            router.replace(
                {
                    pathname: router.pathname,
                    query: { ...router.query, query },
                },
                undefined,
                { shallow: true }, // Prevent a full page reload
            );
            console.log('Processing search on the current page:', query);
        } else {
            // Redirect to the search page with the query as a parameter
            router.push({
                pathname: '/search',
                query: { query },
            });
        }
        console.log(`searching for: ${query}`);
        try {
            const response = await fetch(
                `http://localhost:8000/profile/detailed/${query}`,
            );
            if (!response.ok) {
                console.log(`error searching for: ${query}`);
                return;
            }
            const data = await response.json();
            console.log(`search data received: ${data}`);
        } catch (error) {
            console.log(`error searching for ${query}: ${error}`);
        }
    };

    const handleClear = (): void => {
        console.log('clearing search');
        setQuery('');
    };

    // not doing what it's supposed atm, will fix later
    const handleOnFocus = () => {
        if (query == 'search') {
            setQuery('');
        }
    };

    return (
        <div id="app">
            <FormControl sx={{ margin: 0 }}>
                <TextField
                    size="small"
                    variant="filled"
                    value={query}
                    onChange={(e) => handleChange(e)}
                    onFocus={handleOnFocus}
                    onSubmit={handleSearch}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                onClick={handleSearch}
                            >
                                <Search />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment
                                position="end"
                                style={{ display: showClearIcon }}
                                onClick={handleClear}
                            >
                                <Clear />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: '300px',
                        '& .MuiFilledInput-root': {
                            color: '#ffffff',
                            fontFamily: 'Menlo, monospace',
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '7px',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.4)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                border: '1px solid rgba(255, 255, 255, 0.6)',
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                            },
                            '&:hover:not(.Mui-disabled)': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                            '&.Mui-focused:not(.Mui-disabled)': {
                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            },
                            '& input': {
                                color: '#ffffff',
                                '&::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.5)',
                                },
                            },
                        },
                        '& .MuiInputAdornment-root': {
                            color: '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: 'rgba(255, 255, 255, 0.8)',
                                transform: 'scale(1.1)',
                            },
                        },
                        '& .MuiFilledInput-underline': {
                            '&:before': {
                                borderBottom: 'none',
                            },
                            '&:after': {
                                borderBottom: 'none',
                            },
                            '&:hover:not(.Mui-disabled):before': {
                                borderBottom: 'none',
                            },
                        },
                    }}
                />
            </FormControl>
        </div>
    );
};

export default SearchBar;
