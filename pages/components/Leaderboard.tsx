import React from 'react';
import Link from 'next/link';

const Leaderboard = ({ cat, data }) => {
    return (
        <div style={{ width: '600px', margin: '0 auto', textAlign: 'center' }}>
            <h2>{cat}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid black' }}>
                            Rank
                        </th>
                        <th style={{ borderBottom: '1px solid black' }}>
                            Username
                        </th>
                        <th style={{ borderBottom: '1px solid black' }}>
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(([score, username], index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {
                                    <div>
                                        <Link href={'/profiles/' + username}>
                                            {username}
                                        </Link>
                                    </div>
                                }
                            </td>
                            <td>{score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
