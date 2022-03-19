// @ts-nocheck
require('dotenv').config();
const { exec } = require('child_process');

const {
    Telegraf,
    Markup,
    session,
    Composer,
    Scenes,
    extra,
} = require('telegraf');

const token = process.env.ADMIN_BOT_TOKEN;
if (token === undefined) {
    throw new Error('ADMIN_BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token, { channelMode: false });
if (process.env.ADMIN_LOGS) {
    bot.use(Telegraf.log());
}

var admin = new Composer();
admin.command('restart_bot', (ctx) => {
    try {
        exec('pm2 restart itarmyhelper_bot', (error, stdout, stderr) => {
            if (error) {
                ctx.reply('NOT restarted! ❌');
                console.log(`error: ${error.message}`);
                return;
            }
            ctx.reply('Restarted! 👌');
            console.log(`stdout: ${stdout}`);
        });
    } catch (error) {
        console.log(error);
        ctx.reply('NOT restarted! ❌');
    }
});

const adminsIds = (process.env.ADMINS || '').split(',');
bot.use(Composer.acl(adminsIds, admin));

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
