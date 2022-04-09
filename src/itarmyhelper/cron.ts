// @ts-nocheck
const cron = require('node-cron');

const {CHAT_ID} = process.env;

module.exports.setup = (bot, config) => {

  let cronList = [
    'cron1',
    'cron2',
    'cron3',
    'cron4',
    'cron5'
  ]

  cronList.map((name) => {

    if (config[name].enabled) {
      try {
        cron.schedule(config[name].schedule, () => {
          try {
            bot.telegram.sendMessage(CHAT_ID, config[name].message, {
              parse_mode: 'Markdown',
              disable_web_page_preview: true,
            });
          }
          catch (e) {
            console.log(e);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  });
};
