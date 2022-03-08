// @ts-nocheck
require("dotenv").config();

const {
  Telegraf,
  Markup,
  session,
  Composer,
  Scenes,
  extra,
} = require("telegraf");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(token, { channelMode: false });
bot.use(Telegraf.log());

bot.use(session());

//bot actions logic

//TODO: replace with wizard according to the spec
//https://github.com/telegraf/telegraf/tree/v4/docs/examples/wizards
const actions = [
  [
    "Хочу почати DDoS",
    "ddos",
    "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit?usp=sharing",
  ],
  [
    "Хочу поскаржитись на канал Телеграм/Інста/ФБ і т.д",
    "report",
    "https://forms.gle/geQDdwojoBLxFAVX7",
  ],
  [
    "Хочу допомогти країні навичками/часом",
    "assist",
    "https://forms.gle/geQDdwojoBLxFAVX7",
  ],
  [
    "Мені потрібна допомога (евакуація і т.д.)",
    "help",
    "https://forms.gle/geQDdwojoBLxFAVX7",
  ],
];

actions.map(([, action, reactionText]) => {
  bot.action(action, (ctx) => {
    ctx.session = { inputType: action };
    ctx.editMessageText(reactionText);
  });
});

//group logic part

const hotWords = ["ддос", "допомога", "допомогти"];

bot.start(async (ctx) => {
  return await ctx.reply(
    "Ви можете обрати:",
    Markup.inlineKeyboard(
      actions.map(([title, action]) => [Markup.button.callback(title, action)])
    )
  );
});

bot.on("message", async (ctx) => {
  ctx.session?.inputType ? await funcs[ctx.session?.inputType](ctx) : null;
  ctx.session = { inputType: null };

  if (hotWords.some((v) => ctx.message.text.includes(v))) {
    await ctx.deleteMessage(ctx.id);
    await ctx.telegram.sendMessage(
      ctx.from.id,
      `'${ctx.message.text}'\nВаш месадж було видалено\n\nСпробуйте /start`
    );
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
