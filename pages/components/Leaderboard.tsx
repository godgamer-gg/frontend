import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Page.module.css';

const Leaderboard = ({ cat, data }) => {
    return (
        <div className={styles.leaderboard}>
            <h2 className={styles.heading}>{cat}</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>Rank</th>
                        <th className={styles.tableHeader}>Username</th>
                        <th className={styles.tableHeader}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(([score, username], index) => (
                        <tr key={index} className={styles.tableRow}>
                            <td className={styles.tableCell}>{index + 1}</td>
                            <td className={styles.tableCell}>
                                <Link
                                    href={'/profiles/' + username}
                                    className={styles.link}
                                >
                                    {username}
                                </Link>
                            </td>
                            <td className={styles.tableCell}>{score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
