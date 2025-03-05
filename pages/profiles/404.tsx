import React from 'react';
import { Button } from '@mui/material';

export default function ErrorPage() {
    return (
        <div>
            <h1> We're sorry the requested user could not be found </h1>;
            {/* insert some image of a sad controller or something */}
            <Button href="/" variant="contained">
                Home
            </Button>
        </div>
    );
}
