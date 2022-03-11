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
// bot.use(Telegraf.log());

bot.use(session());

//bot actions logic
const stepHandler = new Composer<Scenes.WizardContext>();

/**
 * UA menu
 */
(() => {
    stepHandler.action("ua_ddos_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_ddos_targets", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_ddos", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [Markup.button.callback("Інструкції", "ua_ddos_info")],
                [Markup.button.callback("Цілі для атаки", "ua_ddos_targets")],
                [Markup.button.callback("Назад", "lang_ua")],
            ])
        );
    });

    stepHandler.action("ua_report", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Хочу додати аккаунт пропагандистів",
                        "ua_report_add"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Список каналів пропагандисті в для скарг",
                        "ua_report_list"
                    ),
                ],
                [Markup.button.callback("Назад", "lang_ua")],
            ])
        );
    });

    stepHandler.action("ua_report_add", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_report_list", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_help_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_help", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Хочу надати інформацію чим я можу бути корисним",
                        "ua_help_info"
                    ),
                ],
                [Markup.button.callback("Назад", "lang_ua")],
            ])
        );
    });

    stepHandler.action("ua_need_help_me", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_need_help", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Мені потрібна допомога волонтерів",
                        "ua_need_help_me"
                    ),
                ],
                [Markup.button.callback("Назад", "lang_ua")],
            ])
        );
    });

    stepHandler.action("ua_chat_link", async (ctx) => {
        ctx.editMessageText("https://t.me/+3aSSvajxwOFkMmIy");
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ua_chat", async (ctx) => {
        await ctx.editMessageText(
            "Без спама. Без збору коштів. Без прохань забанити канал у чаті (для цього є бот і спеціальна форма). Без реклами. Не кидати сюди ссилки без опису.\n" +
                "Обговорюємо тут тільки атаки DDos і їх координацію.",
            Markup.inlineKeyboard([
                [Markup.button.callback("Перейти в чат", "ua_chat_link")],
                [Markup.button.callback("Назад", "lang_ua")],
            ])
        );
    });

    stepHandler.action("lang_select", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть мову/Выберете язык/Select language",
            Markup.inlineKeyboard([
                Markup.button.callback("➡️ UA", "lang_ua"),
                Markup.button.callback("➡️ RU", "lang_ru"),
                Markup.button.callback("➡️ EN", "lang_en"),
            ])
        )
    });

    stepHandler.action("lang_ua", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [Markup.button.callback("Почати ДДос", "ua_ddos")],
                [
                    Markup.button.callback(
                        "Хочу поскаржитись на канал Телеграм/Інста/ФБ і т.д",
                        "ua_report"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Хочу допомогти країні навичками/часом",
                        "ua_help"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Мені потрібна допомога (евакуація і т.д.)",
                        "ua_need_help"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Перейти в живий чат IT Армії",
                        "ua_chat"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Перейти до вибору мови",
                        "lang_select"
                    ),
                ],
            ])
        );
    });
})();

/**
 * RU menu
 */
(() => {
    stepHandler.action("ru_ddos_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_ddos_targets", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_ddos", async (ctx) => {
        await ctx.editMessageText(
            "Выберите действие",
            Markup.inlineKeyboard([
                [Markup.button.callback("Инструкции", "ru_ddos_info")],
                [Markup.button.callback("Цели для атаки", "ru_ddos_targets")],
                [Markup.button.callback("Назад", "lang_ru")],
            ])
        );
    });

    stepHandler.action("ru_report", async (ctx) => {
        await ctx.editMessageText(
            "Выберите действие",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Хочу добавить аккаунт пропагандистов",
                        "ru_report_add"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Список каналов пропагандист ов для жалобы",
                        "ru_report_list"
                    ),
                ],
                [Markup.button.callback("Назад", "lang_ru")],
            ])
        );
    });

    stepHandler.action("ru_report_add", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_report_list", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_help_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_help", async (ctx) => {
        await ctx.editMessageText(
            "Выберите действие",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Хочу предоставить информацию чем я могу быть полезен",
                        "ru_help_info"
                    ),
                ],
                [Markup.button.callback("Назад", "lang_ru")],
            ])
        );
    });

    stepHandler.action("ru_need_help_me", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_need_help", async (ctx) => {
        await ctx.editMessageText(
            "Выберите действие",
            Markup.inlineKeyboard([
                [Markup.button.callback("Мне нужна помощь", "ru_need_help_me")],
                [Markup.button.callback("Назад", "lang_ru")],
            ])
        );
    });

    stepHandler.action("ru_chat_link", async (ctx) => {
        ctx.editMessageText("https://t.me/+3aSSvajxwOFkMmIy");
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("ru_chat", async (ctx) => {
        await ctx.editMessageText(
            "Без спама. Без сбора средств. Без просьбы забанить канал в чате (для этого есть бот и специальная форма). Без рекламы. Не бросать сюда ссылки без описания.\n" +
                "Обсуждаем тут только DDos атаки и их координацию.",
            Markup.inlineKeyboard([
                [Markup.button.callback("Перейти в чат", "ru_chat_link")],
                [Markup.button.callback("Назад", "lang_ru")],
            ])
        );
    });

    stepHandler.action("lang_ru", async (ctx) => {
        await ctx.editMessageText(
            "Оберіть дію",
            Markup.inlineKeyboard([
                [Markup.button.callback("Начать ДДоС", "ru_ddos")],
                [
                    Markup.button.callback(
                        "Пожаловаться на пропаганду",
                        "ru_report"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Хочу помочь стране своим навыком/временем",
                        "ru_help"
                    ),
                ],
                [Markup.button.callback("Мне нужна помощь", "ru_need_help")],
                [
                    Markup.button.callback(
                        "Перейти в живой чат ИТ армии",
                        "ru_chat"
                    ),
                ],
                [
                    Markup.button.callback(
                        "Перейти к выбору языка",
                        "lang_select"
                    ),
                ],
            ])
        );
    });
})();

/**
 * EN menu
 */
(() => {
    stepHandler.action("en_ddos_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_ddos_targets", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_ddos", async (ctx) => {
        await ctx.editMessageText(
            "Choose an action",
            Markup.inlineKeyboard([
                [Markup.button.callback("Instructions", "en_ddos_info")],
                [
                    Markup.button.callback(
                        "Targets for attack",
                        "en_ddos_targets"
                    ),
                ],
                [Markup.button.callback("Go back", "lang_en")],
            ])
        );
    });

    stepHandler.action("en_report", async (ctx) => {
        await ctx.editMessageText(
            "Choose an action",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "Complain about propaganda",
                        "en_report_add"
                    ),
                ],
                [
                    Markup.button.callback(
                        "List of channels for advocates for complaints",
                        "en_report_list"
                    ),
                ],
                [Markup.button.callback("Go back", "lang_en")],
            ])
        );
    });

    stepHandler.action("en_report_add", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_report_list", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_help_info", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_help", async (ctx) => {
        await ctx.editMessageText(
            "Choose an action",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "I want to provide information on what I can be useful",
                        "en_help_info"
                    ),
                ],
                [Markup.button.callback("Go back", "lang_en")],
            ])
        );
    });

    stepHandler.action("en_need_help_me", async (ctx) => {
        ctx.editMessageText(
            "https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform"
        );
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_need_help", async (ctx) => {
        await ctx.editMessageText(
            "Choose an action",
            Markup.inlineKeyboard([
                [
                    Markup.button.callback(
                        "I need the help of volunteers",
                        "en_need_help_me"
                    ),
                ],
                [Markup.button.callback("Go back", "lang_en")],
            ])
        );
    });

    stepHandler.action("en_chat_link", async (ctx) => {
        ctx.editMessageText("https://t.me/+3aSSvajxwOFkMmIy");
        ctx.scene.enter("super-wizard");
    });

    stepHandler.action("en_chat", async (ctx) => {
        await ctx.editMessageText(
            "No spam. Without fundraising. Without being asked to ban the channel in the chat (there is a bot and a special form for this). No ads. Do not throw links here without a description.\n" +
                "We discuss here only DDos attacks and their coordination.",
            Markup.inlineKeyboard([
                [Markup.button.callback("Go to chat", "en_chat_link")],
                [Markup.button.callback("Go back", "lang_en")],
            ])
        );
    });

    stepHandler.action("lang_en", async (ctx) => {
        await ctx.editMessageText(
            "Choose an action",
            Markup.inlineKeyboard([
                [Markup.button.callback("Start DDoS attack", "en_ddos")],
                [
                    Markup.button.callback(
                        "Complain about propaganda",
                        "en_report"
                    ),
                ],
                [
                    Markup.button.callback(
                        "I want to help the country with my skills / time",
                        "en_help"
                    ),
                ],
                [Markup.button.callback("I need help", "en_need_help")],
                [Markup.button.callback("Go to live Army IT chat", "en_chat")],
                [
                    Markup.button.callback(
                        "Go back to language select",
                        "lang_select"
                    ),
                ],
            ])
        );
    });
})();

const superWizard = new Scenes.WizardScene(
    "super-wizard",
    async (ctx) => {
        await ctx.reply(
            "Оберіть мову/Выберете язык/Select language",
            Markup.inlineKeyboard([
                Markup.button.callback("➡️ UA", "lang_ua"),
                Markup.button.callback("➡️ RU", "lang_ru"),
                Markup.button.callback("➡️ EN", "lang_en"),
            ])
        );
        return ctx.wizard.next();
    },
    stepHandler
);

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
    default: "super-wizard",
});

bot.use(Scenes.Stage.privateChat(stage.middleware()));

// To start wizard after bot restart.
bot.command('/start',
    (ctx) => ctx.scene.enter("super-wizard")
);

//group logic part

const hw1 = [
    "новичек",
    "новичок",
    "как начать",
    "я хочу дедос",
    "инструкции",
    "инструкция",
    "новачок",
    "як почати",
    "я хочу дедос",
    "інструкції",
    "інструкція",
];

const hw2 = [
    "https://t.me",
    "https://www.youtube.com",
    "https://instagram.com",
    "https://vk.com",
    "https://www.tiktok.com",
    "https://vm.tiktok.com",
    "https://www.facebook.com",
];

const hw3 = [
    "что атакуем",
    "дайте цель",
    "какие цели",
    "цель",
    "по кому дедосим",
    "що атакуємо",
    "дайте ціль",
    "які цілі",
    "ціль",
    "по кому дедосим",
    "по кому дудосим",
];

const hasHw = (ctx, hw) => {
    return hw.some((v) => ctx.message?.text?.toLowerCase().includes(v));
};

bot.on("message", async (ctx) => {
    const hasHw1 = hasHw(ctx, hw1);
    const hasHw2 = hasHw(ctx, hw2);
    const hasHw3 = hasHw(ctx, hw3);
    if (hasHw1) {
        await ctx.reply(
            `Привіт, я бот ІТ армії, як почати ДДоС, інструкціх та цілі знаходяться за посиланням`
        );
        await ctx.reply(
            `https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946`
        );
    }
    if (hasHw2) {
        await ctx.deleteMessage(ctx.id);
        await ctx.telegram.sendMessage(
            ctx.from.id,
            `'${ctx.message.text}'\nВаш месадж було видалено\n\n`
        );
        await ctx.telegram.sendMessage(
            ctx.from.id,
            `Привіт, я бот ІТ армії, додати канал пропагандистів можна за посиланням\n\nhttps://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform\n\nАбо через телеграм бот @stopdrugsbot`
        );
    }
    if (hasHw3) {
        await ctx.reply(
            `Привіт, я бот ІТ армії, актуальний список цілей за посиланням, також там є статус доступності ресурса`
        );
        await ctx.reply(
            `https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0`
        );
    }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
