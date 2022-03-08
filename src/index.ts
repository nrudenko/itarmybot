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
const stepHandler = new Composer<Scenes.WizardContext>()

const ua_actions = [
    [
        'Хочу почати DDoS',
        'menu',
        'ua_ddos',
        [
            [
                'Інструкції',
                'link',
                'ua_ddos_instructions',
                'https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946'
            ],
            [
                'Цілі для атаки',
                'link',
                'ua_ddos_targets',
                'https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0'

            ]
        ]
    ],
    [
        'Хочу поскаржитись на канал Телеграм/Інста/ФБ і т.д',
        'menu',
        'ua_report',
        [
            [
                'Хочу додати аккаунт пропагандистів',
                'link',
                'ua_report_add',
                'https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform'
            ],
            [
                'Список каналів пропагандисті в для скарг',
                'link',
                'ua_report_list',
                'https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0'
            ]

        ]
    ],
    [
        'Хочу допомогти країні своїми навичками/часом',
        'menu',
        'ua_help',
        [
            [
                'Хочу надати інформацію чим я можу бути корисним',
                'link',
                'ua_help_info',
                'https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform'
            ]
        ]
    ],
    [
        'Мені потрібна допомога',
        'menu',
        'ua_need_help',
        [
            [
                'Мені потрібна допомога волонтерів',
                'link',
                'ua_need_help_me',
                'https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform'
            ]
        ]
    ]
];

function register_action(lang_actions:string[][]) {
    // console.log(lang_actions);
    const menu_items = [];

    lang_actions.map(([title, type, action, submenu]) => {
        if (type == 'menu') {
            menu_items.push(Markup.button.callback(title, action));
        }

    });

    menu_items.push(Markup.button.callback('Назад', 'lang_ua'));

    console.log(menu_items);
    stepHandler.action('lang_ua', async (ctx) => {
        await ctx.reply(
            'Оберіть опцію',
            Markup.inlineKeyboard([
                menu_items
            ])
        )
    });



    // if (type == 'menu') {
    //
    //     const menu_items = [];
    //
    //     submenu.map(([title, type, action, ]) => {
    //         register_action(title, type, action, submenu);
    //         menu_items.push([title, action]);
    //     });
    //
    //     menu_items.push(['Назад', 'lang_ua']);
    //
    //     console.log(menu_items);
    //
    //     stepHandler.action(menu_action, async (ctx) => {
    //         await ctx.reply(
    //             title,
    //             Markup.inlineKeyboard([
    //                 menu_items
    //             ])
    //         )
    //     });
    // }
    //
    // if (type == 'link') {
    //     stepHandler.action(menu_action, async (ctx) => {
    //         ctx.editMessageText(submenu);
    //     })
    // }
}

// register_action(ua_actions);

// ua_actions.map(([title, type, menu_action, submenu]) => {
//     // console.log(menu_action)
//     register_action(title, type, menu_action, submenu);
// });


// ua_actions.map(([title, type, action, submenu]) => {
//       if (type == 'menu') {
//           stepHandler.action(action, async (ctx) => {
//               await ctx.reply(
//                   title,
//                   Markup.inlineKeyboard([
//                       [Markup.button.callback('Почати ДДос', 'ua_ddos')],
//                       [Markup.button.callback('Хочу поскаржитись на канал Телеграм/Інста/ФБ і т.д', 'ua_ddos')],
//                       [Markup.button.callback('Хочу допомогти країні навичками/часом', 'ua_ddos')],
//                       [Markup.button.callback('Мені потрібна допомога (евакуація і т.д.)', 'ua_ddos')],
//                       [Markup.button.callback('Назад', 'lang_ua')],
//                   ])
//               )
//           })
//       }
// });

// UA start.
stepHandler.action('ua_ddos_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946');
})

stepHandler.action('ua_ddos_targets', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0');
})

stepHandler.action('ua_ddos', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Інструкції', 'ua_ddos_info')],
            [Markup.button.callback('Цілі для атаки', 'ua_ddos_targets')],
            [Markup.button.callback('Назад', 'lang_ua')],
        ])
    )
})

stepHandler.action('ua_report', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Хочу додати аккаунт пропагандистів', 'ua_report_add')],
            [Markup.button.callback('Список каналів пропагандисті в для скарг', 'ua_report_list')],
            [Markup.button.callback('Назад', 'lang_ua')],
        ])
    )
})

stepHandler.action('ua_report_add', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform');
})

stepHandler.action('ua_report_list', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0');
})


stepHandler.action('ua_help_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform');
})

stepHandler.action('ua_help', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Хочу надати інформацію чим я можу бути корисним', 'ua_help_info')],
            [Markup.button.callback('Назад', 'lang_ua')],
        ])
    )
})

stepHandler.action('ua_need_help_me', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform');
})

stepHandler.action('ua_need_help', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Мені потрібна допомога волонтерів', 'ua_need_help_me')],
            [Markup.button.callback('Назад', 'lang_ua')],
        ])
    )
})


stepHandler.action('ua_chat_link', async (ctx) => {
    ctx.editMessageText('https://t.me/+3aSSvajxwOFkMmIy');
})
stepHandler.action('ua_chat', async (ctx) => {

    await ctx.reply(
        'Без спама. Без збору коштів. Без прохань забанити канал у чаті (для цього є бот і спеціальна форма). Без реклами. Не кидати сюди ссилки без опису.\n' +
        'Обговорюємо тут тільки атаки DDos і їх координацію.',
        Markup.inlineKeyboard([
            [Markup.button.callback('Перейти в чат', 'ua_chat_link')],
        ])
    )
})

stepHandler.action('lang_ua', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Почати ДДос', 'ua_ddos')],
            [Markup.button.callback('Хочу поскаржитись на канал Телеграм/Інста/ФБ і т.д', 'ua_report')],
            [Markup.button.callback('Хочу допомогти країні навичками/часом', 'ua_help')],
            [Markup.button.callback('Мені потрібна допомога (евакуація і т.д.)', 'ua_need_help')],
            [Markup.button.callback('Перейти в живий чат IT Армії', 'ua_chat')],
            [Markup.button.callback('Назад', 'lang_ua')],
        ])
    )
})
// UA end.


// RU start.
stepHandler.action('ru_ddos_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946');
})

stepHandler.action('ru_ddos_targets', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0');
})

stepHandler.action('ru_ddos', async (ctx) => {
    await ctx.reply(
        'Выберите действие',
        Markup.inlineKeyboard([
            [Markup.button.callback('Инструкции', 'ru_ddos_info')],
            [Markup.button.callback('Цели для атаки', 'ru_ddos_targets')],
            [Markup.button.callback('Назад', 'lang_ru')],
        ])
    )
})

stepHandler.action('ru_report', async (ctx) => {
    await ctx.reply(
        'Выберите действие',
        Markup.inlineKeyboard([
            [Markup.button.callback('Хочу добавить аккаунт пропагандистов', 'ru_report_add')],
            [Markup.button.callback('Список каналов пропагандист ов для жалобы', 'ru_report_list')],
            [Markup.button.callback('Назад', 'lang_ru')],
        ])
    )
})

stepHandler.action('ru_report_add', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform');
})

stepHandler.action('ru_report_list', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0');
})


stepHandler.action('ru_help_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform');
})

stepHandler.action('ru_help', async (ctx) => {
    await ctx.reply(
        'Выберите действие',
        Markup.inlineKeyboard([
            [Markup.button.callback('Хочу предоставить информацию чем я могу быть полезен', 'ru_help_info')],
            [Markup.button.callback('Назад', 'lang_ru')],
        ])
    )
})

stepHandler.action('ru_need_help_me', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform');
})

stepHandler.action('ru_need_help', async (ctx) => {
    await ctx.reply(
        'Выберите действие',
        Markup.inlineKeyboard([
            [Markup.button.callback('Мне нужна помощь', 'ru_need_help_me')],
            [Markup.button.callback('Назад', 'lang_ru')],
        ])
    )
})


stepHandler.action('ru_chat_link', async (ctx) => {
    ctx.editMessageText('https://t.me/+3aSSvajxwOFkMmIy');
})
stepHandler.action('ru_chat', async (ctx) => {

    await ctx.reply(
        'Без спама. Без сбора средств. Без просьбы забанить канал в чате (для этого есть бот и специальная форма). Без рекламы. Не бросать сюда ссылки без описания.\n' +
        'Обсуждаем тут только DDos атаки и их координацию.',
        Markup.inlineKeyboard([
            [Markup.button.callback('Перейти в чат', 'ru_chat_link')],
        ])
    )
})

stepHandler.action('lang_ru', async (ctx) => {
    await ctx.reply(
        'Оберіть дію',
        Markup.inlineKeyboard([
            [Markup.button.callback('Начать ДДоС', 'ru_ddos')],
            [Markup.button.callback('Пожаловатьс я на пропаганду', 'ru_report')],
            [Markup.button.callback('Хочу помочь стране стоит навыком/временем', 'ru_help')],
            [Markup.button.callback('Мне нужна помощь', 'ru_need_help')],
            [Markup.button.callback('Перейти в живой чат ИТ армии', 'ru_chat')],
            [Markup.button.callback('Назад', 'lang_ru')],
        ])
    )
})
// RU end.

// EN start.
stepHandler.action('en_ddos_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=1176996946');
})

stepHandler.action('en_ddos_targets', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1CpIXntRLQ_ULJMqBQmgW7mShzOhd95nCaL2BhNRnA0o/edit#gid=0');
})

stepHandler.action('en_ddos', async (ctx) => {
    await ctx.reply(
        'Choose an action',
        Markup.inlineKeyboard([
            [Markup.button.callback('Instructions', 'en_ddos_info')],
            [Markup.button.callback('Targets for attack', 'en_ddos_targets')],
            [Markup.button.callback('Go back', 'lang_en')],
        ])
    )
})

stepHandler.action('en_report', async (ctx) => {
    await ctx.reply(
        'Choose an action',
        Markup.inlineKeyboard([
            [Markup.button.callback('Complain about propaganda', 'en_report_add')],
            [Markup.button.callback('List of channels for advocates for complaints', 'en_report_list')],
            [Markup.button.callback('Go back', 'lang_en')],
        ])
    )
})

stepHandler.action('en_report_add', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSeFaWPVnOCRH__sdIHHJEfZyNlRPuabYs54Jx2fr8NKk6Bn_A/viewform');
})

stepHandler.action('en_report_list', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/spreadsheets/d/1Ct51AdIEhgAQoPntFXtmvIgt8zj8Dh7LDB9_wysQtQU/edit#gid=0');
})


stepHandler.action('en_help_info', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe3M1jW5ieBkd4FMpktrFuRpCpmF5zQjg8W1qHe9uO0z_QO-g/viewform');
})

stepHandler.action('en_help', async (ctx) => {
    await ctx.reply(
        'Choose an action',
        Markup.inlineKeyboard([
            [Markup.button.callback('I want to provide information on what I can be useful', 'en_help_info')],
            [Markup.button.callback('Go back', 'lang_en')],
        ])
    )
})

stepHandler.action('en_need_help_me', async (ctx) => {
    ctx.editMessageText('https://docs.google.com/forms/d/e/1FAIpQLSe43dns0sOTudo9uFU1RroB3DTkvyIOu6haALFmWqp2Ih6nYQ/viewform');
})

stepHandler.action('en_need_help', async (ctx) => {
    await ctx.reply(
        'Choose an action',
        Markup.inlineKeyboard([
            [Markup.button.callback('I need the help of volunteers', 'en_need_help_me')],
            [Markup.button.callback('Go back', 'lang_en')],
        ])
    )
})


stepHandler.action('en_chat_link', async (ctx) => {
    ctx.editMessageText('https://t.me/+3aSSvajxwOFkMmIy');
})
stepHandler.action('en_chat', async (ctx) => {

    await ctx.reply(
        'No spam. Without fundraising. Without being asked to ban the channel in the chat (there is a bot and a special form for this). No ads. Do not throw links here without a description.\n' +
        'We discuss here only DDos attacks and their coordination.',
        Markup.inlineKeyboard([
            [Markup.button.callback('Go to chat', 'en_chat_link')],
        ])
    )
})

stepHandler.action('lang_en', async (ctx) => {
    await ctx.reply(
        'Choose an action',
        Markup.inlineKeyboard([
            [Markup.button.callback('Start DDoS attack', 'en_ddos')],
            [Markup.button.callback('Complain about propaganda', 'en_report')],
            [Markup.button.callback('I want to help the country with my skills / time', 'en_help')],
            [Markup.button.callback('I need help', 'en_need_help')],
            [Markup.button.callback('Go to live Army IT chat', 'en_chat')],
            [Markup.button.callback('Go back', 'lang_en')],
        ])
    )
})
// EN end.


const superWizard = new Scenes.WizardScene(
    'super-wizard',
    async (ctx) => {
        await ctx.reply(
            'Оберіть мову/Выберете язык/Select language',
            Markup.inlineKeyboard([
                Markup.button.callback('➡️ UA', 'lang_ua'),
                Markup.button.callback('➡️ RU', 'lang_ru'),
                Markup.button.callback('➡️ EN', 'lang_en'),
            ])
        )
        return ctx.wizard.next()
    },
    stepHandler,
)

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
    default: 'super-wizard',
})

bot.use(stage.middleware())

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
//
// actions.map(([, action, reactionText]) => {
//   bot.action(action, (ctx) => {
//     ctx.session = { inputType: action };
//     ctx.editMessageText(reactionText);
//   });
// });



//group logic part

const hotWords = ["ддос", "допомога", "допомогти"];

// bot.start(async (ctx) => {
//   return await ctx.reply(
//     "Ви можете обрати:",
//     Markup.inlineKeyboard(
//       actions.map(([title, action]) => [Markup.button.callback(title, action)])
//     )
//   );
// });

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
