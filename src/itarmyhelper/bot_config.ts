// @ts-nocheck
var axios = require('axios');

const GOOGLE_ID = '1UY-DGbGA7RK9Nvd-F25IEN99ptCsbPmOGwh_70Vq4PE';

const pages = [
    ['infoHotWords', 0],
    ['targetsHotWords', 863483461],
    ['stopWords', 1931042498],
    ['links', 96729499],
];

const configPage = 615511405;

const configs = [
        'infoHotWordsMessage',
        'targetsHotWordsMessage',
        'stopWordsMessage',
        'linksMessage',
        'cron1',
        'cron2',
        'cron3',
        'cron4',
        'cron5'
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


    let response = await axios.get(
        `https://docs.google.com/spreadsheets/d/${GOOGLE_ID}/gviz/tq?tqx=out:json&tq&gid=${configPage}`
    );
    const [stringData] = response.data.match(
        /(?<="table":).*(?=}\);)/g
    );

    const { rows } = JSON.parse(stringData);

    const parsedConfigPage = await Promise.all(

        configs.map(async (name, index) => {

            // console.log(index);
            // Enabled.
            let enabled = (rows[index]['c'][2] != null ?
                    rows[index]['c'][2]['v'] != null ? rows[index]['c'][2]['v'] : 0 : 0
            );
            // Message.
            let message = (rows[index]['c'][1] != null ?
                    rows[index]['c'][1]['v'] != null ? rows[index]['c'][1]['v'] : '' : ''
            );

            // Schedule.
            if (name.startsWith('cron')) {
                let schedule = (rows[index]['c'][3] != null ?
                        rows[index]['c'][3]['v'] != null ? rows[index]['c'][3]['v'] : '' : ''
                );

                return [name, {'enabled': enabled, 'message': message, 'schedule': schedule}];
            }
            else {
                return [name, {'enabled': enabled, 'message': message}];
            }
        })
    );

    return Object.fromEntries(parsedPages.concat(parsedConfigPage));
}
