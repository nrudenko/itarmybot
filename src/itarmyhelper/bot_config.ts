// @ts-nocheck
var axios = require('axios');

const GOOGLE_ID = '1UY-DGbGA7RK9Nvd-F25IEN99ptCsbPmOGwh_70Vq4PE';

const pages = [
    ['infoHotWords', 0],
    ['targetsHotWords', 863483461],
    ['stopWords', 1931042498],
    ['links', 96729499],
];

export async function fetch() {
    const parsedPages = await Promise.all(
        pages.map(async ([name, gid]) => {
            const response = await axios.get(
                `https://docs.google.com/spreadsheets/d/${GOOGLE_ID}/gviz/tq?tqx=out:json&tq&gid=${gid}`
            );
            const [stringData] = response.data.match(
                /(?<="table":).*(?=}\);)/g
            );
            const { rows } = JSON.parse(stringData);

            return [name, rows.map((row) => row['c'][0]['v'])];
        })
    );
    return Object.fromEntries(parsedPages);
}
