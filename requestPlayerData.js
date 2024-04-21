// requestPlayerData.js

const request = require('request');
const cheerio = require('cheerio');

const url = 'https://baseballsavant.mlb.com/leaderboard/expected_statistics?year=2024';

function getPlayerStats(callback) {
    request(url, (error, response, body) => {
        if (error) {
            console.error('Error fetching webpage:', error);
            callback(error);
            return;
        }

        const $ = cheerio.load(body);
        const scriptContent = $('script').filter(function() {
            return $(this).html().includes('var data =');
        }).html();

        callback(null, extractData(JSON.parse(scriptContent.split('var data = ')[1].split(';')[0])));
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

module.exports = { getPlayerStats };
