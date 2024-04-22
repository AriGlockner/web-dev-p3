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

        const BA = parseFloat(parseFloat(player.ba).toFixed(3));
        const xBA = parseFloat(parseFloat(player.est_ba).toFixed(3));
        const BA_diff = parseFloat((BA - xBA).toFixed(3));

        const SLG = parseFloat(parseFloat(player.slg).toFixed(3));
        const xSLG = parseFloat(parseFloat(player.est_slg).toFixed(3));
        const SLG_diff = parseFloat((SLG - xSLG).toFixed(3));

        const wOBA = parseFloat(parseFloat(player.woba).toFixed(3));
        const xwOBA = parseFloat(parseFloat(player.est_woba).toFixed(3));
        const wOBA_diff = parseFloat((wOBA - xwOBA).toFixed(3));

        const luck = parseFloat(((BA_diff + SLG_diff + wOBA_diff) / 3.0).toFixed(3));

        players.push({Name, PA, BA, xBA, BA_diff, SLG, xSLG, SLG_diff, wOBA, xwOBA, wOBA_diff, luck });
    });

    return players;
}

module.exports = { getPlayerStats };
