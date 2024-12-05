import React from 'react';

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
                    {data.map(([username, score], index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score}</td>
                            <td>{username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
