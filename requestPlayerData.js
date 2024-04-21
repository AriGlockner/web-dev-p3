const request = require('request');
const cheerio = require('cheerio');

const url = 'https://baseballsavant.mlb.com/leaderboard/expected_statistics?year=2024';

function getPlayerStats() {
    request(url, (error, response, body) => {
        if (error) {
            console.error('Error fetching webpage:', error);
            return;
        }

        const $ = cheerio.load(body);
        const scriptContent = $('script').filter(function() {
            return $(this).html().includes('var data =');
        }).html();

        const players = extractData(JSON.parse(scriptContent.split('var data = ')[1].split(';')[0]));
        displayPlayerData(players);
    });
}

function extractData(data) {
    const players = [];

    data.forEach(player => {
        const Name = player.entity_name;
        const PA = parseInt(player.pa);
        const BA = player.ba;
        const xBA = player.est_ba;
        const BA_diff = BA - xBA;
        const SLG = player.slg;
        const xSLG = player.est_slg;
        const SLG_diff = SLG - xSLG;
        const wOBA = player.woba;
        const xwOBA = player.est_woba;
        const wOBA_diff = wOBA - xwOBA;
        const luck = (BA_diff + SLG_diff + wOBA_diff) / 3;

        players.push({Name, PA, BA, xBA, BA_diff, SLG, xSLG, SLG_diff, wOBA, xwOBA, wOBA_diff, luck });
    });

    return players;
}

function displayPlayerData(players) {
    const tableDiv = document.getElementById('player-table');
    tableDiv.innerHTML = ''; // Clear previous table content

    const table = document.createElement('table');
    const headerRow = table.insertRow();
    for (const key in players[0]) {
        if (Object.hasOwnProperty.call(players[0], key)) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
    }
    table.appendChild(headerRow);

    players.forEach(player => {
        const row = table.insertRow();
        for (const key in player) {
            if (Object.hasOwnProperty.call(player, key)) {
                const cell = row.insertCell();
                cell.textContent = player[key];
            }
        }
    });

    tableDiv.appendChild(table);
}

document.querySelector('button[id="get-data"]').addEventListener('click', getPlayerStats);
