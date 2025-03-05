import * as React from 'react';
import styles from '../../styles/Home.module.css';

export default function Footer() {
    return (
        <div>
            <footer>
                <a
                    href="https://twitter.com/InvictusZSS"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by Nick Armstrong
                    <img src="/twitter.png" className={styles.logo} />
                </a>
            </footer>
        </div>
    );
}
