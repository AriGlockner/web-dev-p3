// DisplayPlayerData.js

import React, { useState } from 'react';
import getPlayerStats from './requestPlayerData';

function DisplayPlayerData() {
    const [playerData, setPlayerData] = useState([]);

    // Function to fetch player data
    const getPlayerData = () => {
        getPlayerStats((error, data) => {
            if (error) {
                console.error('Error fetching player data:', error);
            } else {
                setPlayerData(data);
            }
        });
    };

    return (
        <div className="container">
            <h1>Player Data</h1>
            <button className="btn btn-primary" onClick={getPlayerData}>Get Player Data</button>
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>PA</th>
                    <th>BA</th>
                    <th>xBA</th>
                    <th>BA_diff</th>
                    <th>SLG</th>
                    <th>xSLG</th>
                    <th>SLG_diff</th>
                    <th>wOBA</th>
                    <th>xwOBA</th>
                    <th>wOBA_diff</th>
                    <th>Luck</th>
                </tr>
                </thead>
                <tbody>
                {playerData.map((player, index) => (
                    <tr key={index}>
                        <td>{player.Name}</td>
                        <td>{player.PA}</td>
                        <td>{player.BA}</td>
                        <td>{player.xBA}</td>
                        <td>{player.BA_diff}</td>
                        <td>{player.SLG}</td>
                        <td>{player.xSLG}</td>
                        <td>{player.SLG_diff}</td>
                        <td>{player.wOBA}</td>
                        <td>{player.xwOBA}</td>
                        <td>{player.wOBA_diff}</td>
                        <td>{player.luck}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default DisplayPlayerData;
