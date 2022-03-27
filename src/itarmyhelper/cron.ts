// @ts-nocheck
const cron = require('node-cron');

const { CHAT_ID } = process.env;

const notification =
    'Правила чату:\n' +
    "Без спаму. Без збору коштів. Без прохань забанити канал у чаті (для цього є офіційний бот @stopdrugsbot, наш бот @itarmyhelper_bot і <a href='https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform'>спеціальна форма</a>). Без реклами. Не кидати сюди посилання без опису.\n" +
    "Запитати чи отримати допомогу такаж можна <a href='https://docs.google.com/forms/d/e/1FAIpQLSfeFKKXQkQaZDwVPZQVRSvbETYtsVZXBawF7fawHeC-m4mQZw/viewform'>тут</a>\n" +
    'Користуйся ботом @itarmyhelper_bot для пошуку корисної інформації.\n' +
    "Швидка перевірка поточних цілей <a href='https://ddosukraine.com.ua/check/'>тут</a>\n\n" +
    'Chat rules:\n' +
    'No spam. Without fundraising. No ads. Do not throw links here without a description.\n' +
    "Use bot @itarmyhelper_bot to find popular information. Ask or offer your help <a href='https://docs.google.com/forms/d/e/1FAIpQLSfeFKKXQkQaZDwVPZQVRSvbETYtsVZXBawF7fawHeC-m4mQZw/viewform'>here</a>.\n" +
    "<a href='https://ddosukraine.com.ua/check/'>Quick check of current targets</a>";

module.exports.setup = (bot) => {
    cron.schedule('*/30 8-23,0-1 * * *', () => {
        bot.telegram.sendMessage(chatId, notification, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });
    });

    cron.schedule('0 2-7 * * *', () => {
        bot.telegram.sendMessage(chatId, notification, {
            parse_mode: 'HTML',
            disable_web_page_preview: true,
        });
    });
};
