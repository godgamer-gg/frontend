import React from 'react';
import { useRouter } from 'next/router';
import Home from './index';
import Login from './login';

const App: React.FC = () => {
    const router = useRouter();

    // Render the appropriate component based on the current route
    const renderPage = () => {
        switch (router.pathname) {
            case '/':
                return <Home />;
            case '/login':
                return <Login />;
            default:
                return <Home />;
        }
    };

    return <div>{renderPage()}</div>;
};

export default App;
