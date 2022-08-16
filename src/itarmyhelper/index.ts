// @ts-nocheck
require('dotenv').config();
const {
    Telegraf,
    Markup,
    session,
    Composer,
    Scenes,
    extra,
} = require('telegraf');

const token = process.env.BOT_TOKEN;

const {CHANNEL_ID} = process.env;
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!');
}

//bot actions logic
const stepHandler = new Composer<Scenes.WizardContext>();

/**
 * UA menu
 */
(() => {
    stepHandler.action('ua_ddos_bot_info', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/bot/',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_bot')],
        ])
      );
    });

    stepHandler.action('ua_ddos_bot_support', async (ctx) => {
      ctx.editMessageText(
        'https://t.me/gov_ddos_ru_bot',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_bot')],
        ])
      );
    });

    stepHandler.action('ua_ddos_bot', async (ctx) => {
      ctx.editMessageText(
        'Інформація про бота',
        Markup.inlineKeyboard([
          [Markup.button.callback('Інструкція', 'ua_ddos_bot_info')],
          [Markup.button.callback('Чат підтримки', 'ua_ddos_bot_support')],
          [Markup.button.callback('Назад', 'ua_ddos_info')],
        ])
      );
    });

    stepHandler.action('ua_ddos_info', async (ctx) => {
      ctx.editMessageText(
        'Оберіть як саме ви хочете долучитися',
        Markup.inlineKeyboard([
          [Markup.button.callback('Інструкції для ПК і ноутбуків', 'ua_ddos_pc')],
          [Markup.button.callback('Інструкції для VPS та VDS серверів', 'ua_ddos_vps')],
          [Markup.button.callback('Бот автоматизіції атак', 'ua_ddos_bot')],
          [Markup.button.callback('Назад', 'ua_ddos')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc', async (ctx) => {
      ctx.editMessageText(
        'Інструкції до рекомендованих утіліт DDOS атак (MHDDOS, DB1000N, DISTRESS)',
        Markup.inlineKeyboard([
          [Markup.button.callback('Інструкції для Linux', 'ua_ddos_pc_linux')],
          [Markup.button.callback('Інструкції для Windows', 'ua_ddos_pc_windows')],
          [Markup.button.callback('Інструкції для Mac', 'ua_ddos_pc_mac')],
          [Markup.button.callback('Назад', 'ua_ddos_info')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_linux_mhddos', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#linux/#linux_mhddos/#binaries',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_linux')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_linux_db1000n', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#linux/#linux_db1000n',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_linux')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_linux_distress', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#linux/#linux_distress',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_linux')],
        ])
      );
    });

  stepHandler.action('ua_ddos_pc_linux_uashield', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/#linux/#linux_uashield',
      Markup.inlineKeyboard([
        [Markup.button.callback('Назад', 'ua_ddos_pc_linux')],
      ])
    );
  });

    stepHandler.action('ua_ddos_pc_linux', async (ctx) => {
      ctx.editMessageText(
        'Інструкції для Linux',
        Markup.inlineKeyboard([
          [Markup.button.callback('MHDDoS', 'ua_ddos_pc_linux_mhddos')],
          [Markup.button.callback('DB1000n', 'ua_ddos_pc_linux_db1000n')],
          [Markup.button.callback('Distress', 'ua_ddos_pc_linux_distress')],
          [Markup.button.callback('UA Shield', 'ua_ddos_pc_linux_uashield')],
          [Markup.button.callback('Назад', 'ua_ddos_pc')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_mac_mhddos', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#mac/#mac_mhddos',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_mac')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_mac_db1000n', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#mac/#mac_db1000n',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_mac')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_mac_distress', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#mac/#mac_distress',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_mac')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_mac_uashield', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#mac/#mac_uashield',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_mac')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_mac', async (ctx) => {
      ctx.editMessageText(
        'Інструкції для Mac',
        Markup.inlineKeyboard([
          [Markup.button.callback('MHDDoS', 'ua_ddos_pc_mac_mhddos')],
          [Markup.button.callback('DB1000n', 'ua_ddos_pc_mac_db1000n')],
          [Markup.button.callback('Distress', 'ua_ddos_pc_mac_distress')],
          [Markup.button.callback('UA Shield', 'ua_ddos_pc_mac_uashield')],
          [Markup.button.callback('Назад', 'ua_ddos_pc')],
        ])
      );
    });


    stepHandler.action('ua_ddos_pc_windows_ukita', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/instruction/#windows/#windows_mhddos/#installer',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_windows')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_windows_ukita_support', async (ctx) => {
      ctx.editMessageText(
        'https://discord.gg/DBYFvGQypD',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_pc_windows')],
        ])
      );
    });

    stepHandler.action('ua_ddos_pc_windows', async (ctx) => {
      ctx.editMessageText(
        'Оберіть утіліту',
        Markup.inlineKeyboard([
          [Markup.button.callback('UkITA інсталятор', 'ua_ddos_pc_windows_ukita')],
          [Markup.button.callback('Discord чат підтримки UkITA', 'ua_ddos_pc_windows_ukita_support')],
          [Markup.button.callback('Назад', 'ua_ddos_pc')],
        ])
      );
    });

    stepHandler.action('ua_ddos_vps', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/vps/',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos_info')],
        ])
      );
    });

    stepHandler.action('ua_ddos_targets', async (ctx) => {
        ctx.editMessageText(
          'https://itarmy.com.ua/?actual-targets',
          Markup.inlineKeyboard([
            [Markup.button.callback('Назад', 'ua_ddos')],
          ])
        );
    });

    stepHandler.action('ua_ddos_targets_status', async (ctx) => {
      ctx.editMessageText(
        'https://itarmy.com.ua/check/',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos')],
        ])
      );
    });

    stepHandler.action('ua_ddos', async (ctx) => {
        await ctx.editMessageText(
            'Оберіть дію',
            Markup.inlineKeyboard([
                [Markup.button.callback('Інструкції', 'ua_ddos_info')],
                [Markup.button.callback('Aктуальні цілі', 'ua_ddos_targets')],
                [Markup.button.callback('Статус цілей', 'ua_ddos_targets_status')],
                [Markup.button.callback('Запропонувати цілі', 'ua_add_target')],
                [Markup.button.callback('Назад', 'lang_ua')],
            ])
        );
    });

    stepHandler.action('ua_vacancy', async (ctx) => {
        await ctx.editMessageText(
            'https://itarmy.com.ua/vacancies/',
            Markup.inlineKeyboard([
                [Markup.button.callback('Назад', 'lang_ua')],
            ])
        );
    });

    stepHandler.action('ua_add_target', async (ctx) => {
      await ctx.editMessageText(
        'https://itarmy.com.ua/?lang=ua&propose_target',
        Markup.inlineKeyboard([
          [Markup.button.callback('Назад', 'ua_ddos')],
        ])
      );
    });

    stepHandler.action('ua_chat', async (ctx) => {
        await ctx.editMessageText(
            'Без спама. Без збору коштів. Без прохань забанити канал у чаті (для цього є бот і спеціальна форма). Без реклами. Не кидати сюди посилання без опису.\n' +
                'Обговорюємо тут тільки атаки DDos і їх координацію. \n' +
            'https://t.me/+3aSSvajxwOFkMmIy',
            Markup.inlineKeyboard([
                [Markup.button.callback('Назад', 'lang_ua')],
            ])
        );
    });

    stepHandler.action('lang_select', async (ctx) => {
        await ctx.editMessageText(
            'Привіт, я бот IT Army of Ukraine. Допоможу тобі долучитись до доброї справи. Давай почнемо з вибору мови?\n' +
            '-----------------------------------------------------------------------------\n' +
            'Hello! I am the IT Army of Ukraine Bot! I can help you in joining us! Please choose a language below.',
            Markup.inlineKeyboard([
                Markup.button.callback('➡️ UA', 'lang_ua'),
                Markup.button.callback('➡️ EN', 'lang_en'),
            ])
        );
    });

    stepHandler.action('lang_ua', async (ctx) => {
        await ctx.editMessageText(
            'Оберіть дію',
            Markup.inlineKeyboard([
                [
                  Markup.button.callback(
                    'Приєднатися до DDOS атаки',
                    'ua_ddos'
                  )
                ],
                [
                    Markup.button.callback(
                        'Наші вакансії',
                        'ua_vacancy'
                    ),
                ],
                [
                    Markup.button.callback(
                        'Перейти до чату IT Army of Ukraine',
                        'ua_chat'
                    ),
                ],
                [
                    Markup.button.callback(
                        'Перейти до вибору мови',
                        'lang_select'
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
  stepHandler.action('en_ddos_bot_info', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/bot/?lang=en',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_bot')],
      ])
    );
  });

  stepHandler.action('en_ddos_bot_support', async (ctx) => {
    ctx.editMessageText(
      'https://t.me/gov_ddos_ru_bot',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_bot')],
      ])
    );
  });

  stepHandler.action('en_ddos_bot', async (ctx) => {
    ctx.editMessageText(
      'Bot information',
      Markup.inlineKeyboard([
        [Markup.button.callback('Instruction', 'en_ddos_bot_info')],
        [Markup.button.callback('Support chat', 'en_ddos_bot_support')],
        [Markup.button.callback('Back', 'en_ddos_info')],
      ])
    );
  });

  stepHandler.action('en_ddos_info', async (ctx) => {
    ctx.editMessageText(
      'How do you want to join?',
      Markup.inlineKeyboard([
        [Markup.button.callback('Instructions for PCs and laptops', 'en_ddos_pc')],
        // [Markup.button.callback('Instructions for VPS and VDS servers', 'en_ddos_vps')],
        [Markup.button.callback('Attack automation bot', 'en_ddos_bot')],
        [Markup.button.callback('Back', 'en_ddos')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc', async (ctx) => {
    ctx.editMessageText(
      'Recommended utilities and instructions for MHDDOS, DB1000N and DISTRESS',
      Markup.inlineKeyboard([
        [Markup.button.callback('Instructions for Linux', 'en_ddos_pc_linux')],
        [Markup.button.callback('Instructions for Windows', 'en_ddos_pc_windows')],
        [Markup.button.callback('Instructions for Mac', 'en_ddos_pc_mac')],
        [Markup.button.callback('Back', 'en_ddos_info')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_linux_mhddos', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#linux/#linux_mhddos/#binaries',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_linux')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_linux_db1000n', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#linux/#linux_db1000n',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_linux')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_linux_distress', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#linux/#linux_distress',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_linux')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_linux_uashield', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#linux/#linux_uashield',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_linux')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_linux', async (ctx) => {
    ctx.editMessageText(
      'Instructions for Linux',
      Markup.inlineKeyboard([
        [Markup.button.callback('MHDDoS', 'en_ddos_pc_linux_mhddos')],
        [Markup.button.callback('DB1000n', 'en_ddos_pc_linux_db1000n')],
        [Markup.button.callback('Distress', 'en_ddos_pc_linux_distress')],
        [Markup.button.callback('UA Shield', 'en_ddos_pc_linux_uashield')],
        [Markup.button.callback('Back', 'en_ddos_pc')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_mac_mhddos', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#mac/#mac_mhddos',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_mac')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_mac_db1000n', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#mac/#mac_db1000n',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_mac')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_mac_distress', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#mac/#mac_distress',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_mac')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_mac_uashield', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#mac/#mac_uashield',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_mac')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_mac', async (ctx) => {
    ctx.editMessageText(
      'Instructions for Mac',
      Markup.inlineKeyboard([
        [Markup.button.callback('MHDDoS', 'en_ddos_pc_mac_mhddos')],
        [Markup.button.callback('DB1000n', 'en_ddos_pc_mac_db1000n')],
        [Markup.button.callback('Distress', 'en_ddos_pc_mac_distress')],
        [Markup.button.callback('UA Shield', 'en_ddos_pc_mac_uashield')],
        [Markup.button.callback('Back', 'en_ddos_pc')],
      ])
    );
  });


  stepHandler.action('en_ddos_pc_windows_ukita', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/instruction/?lang=en#windows/#windows_mhddos/#installer',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_windows')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_windows_ukita_support', async (ctx) => {
    ctx.editMessageText(
      'https://discord.gg/DBYFvGQypD',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_pc_windows')],
      ])
    );
  });

  stepHandler.action('en_ddos_pc_windows', async (ctx) => {
    ctx.editMessageText(
      'Select utility',
      Markup.inlineKeyboard([
        [Markup.button.callback('UkITA installer', 'en_ddos_pc_windows_ukita')],
        [Markup.button.callback('Discord chat support UkITA', 'en_ddos_pc_windows_ukita_support')],
        [Markup.button.callback('Back', 'en_ddos_pc')],
      ])
    );
  });

  stepHandler.action('en_ddos_vps', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/vps/?lang=en',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos_info')],
      ])
    );
  });

  stepHandler.action('en_ddos_targets', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/?actual-targets&lang=en',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos')],
      ])
    );
  });

  stepHandler.action('en_ddos_targets_status', async (ctx) => {
    ctx.editMessageText(
      'https://itarmy.com.ua/check/?lang=en',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos')],
      ])
    );
  });

  stepHandler.action('en_ddos', async (ctx) => {
    await ctx.editMessageText(
      'How can we help you?',
      Markup.inlineKeyboard([
        [Markup.button.callback('Instructions', 'en_ddos_info')],
        [Markup.button.callback('Current targets', 'en_ddos_targets')],
        [Markup.button.callback('Target statuses', 'en_ddos_targets_status')],
        [Markup.button.callback('Add target', 'en_add_target')],
        [Markup.button.callback('Back', 'lang_en')],
      ])
    );
  });

  stepHandler.action('en_vacancy', async (ctx) => {
    await ctx.editMessageText(
      'https://itarmy.com.ua/vacancies/?lang=en',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'lang_en')],
      ])
    );
  });

  stepHandler.action('en_add_target', async (ctx) => {
    await ctx.editMessageText(
      'https://itarmy.com.ua/?lang=en&propose_target',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'en_ddos')],
      ])
    );
  });

  stepHandler.action('en_chat', async (ctx) => {
    await ctx.editMessageText(
      'No spam. Without fundraising. Without being asked to ban the channel in the chat (there is a bot and a special form for this). No ads. Do not throw links here without a description.\n' +
      'We discuss here only DDos attacks and their coordination.\n' +
      'https://t.me/+3aSSvajxwOFkMmIy',
      Markup.inlineKeyboard([
        [Markup.button.callback('Back', 'lang_en')],
      ])
    );
  });

  stepHandler.action('lang_select', async (ctx) => {
    await ctx.editMessageText(
      'Привіт, я бот IT Army of Ukraine. Допоможу тобі долучитись до доброї справи. Давай почнемо з вибору мови?\n' +
      '-----------------------------------------------------------------------------\n' +
      'Hello! I am the IT Army of Ukraine Bot! I can help you in joining us! Please choose a language below.',
      Markup.inlineKeyboard([
        Markup.button.callback('➡️ UA', 'lang_ua'),
        Markup.button.callback('➡️ EN', 'lang_en'),
      ])
    );
  });

  stepHandler.action('lang_en', async (ctx) => {
    await ctx.editMessageText(
      'How can we help you?',
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            'Join DDoS attack',
            'en_ddos'
          )
        ],
        // [
        //   Markup.button.callback(
        //     'Our vacancies',
        //     'en_vacancy'
        //   ),
        // ],
        [
          Markup.button.callback(
            'IT Army of Ukraine telegram chat',
            'en_chat'
          ),
        ],
        [
          Markup.button.callback(
            'Change language',
            'lang_select'
          ),
        ],
      ])
    );
  });
})();

const superWizard = new Scenes.WizardScene(
    'super-wizard',
    async (ctx) => {
        await ctx.reply(
          'Привіт, я бот IT Army of Ukraine. Допоможу тобі долучитись до доброї справи. Давай почнемо з вибору мови?\n' +
          '-----------------------------------------------------------------------------\n' +
          'Hello! I am the IT Army of Ukraine Bot! I can help you in joining us! Please choose a language below.',
            Markup.inlineKeyboard([
                Markup.button.callback('➡️ UA', 'lang_ua'),
                Markup.button.callback('➡️ EN', 'lang_en'),
            ],
            )
        );
        return ctx.wizard.next();
    },
    stepHandler
);

const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
    default: 'super-wizard',
});

const bot = new Telegraf(token, { channelMode: false });
if (process.env.LOGS) {
    bot.use(Telegraf.log());
}

bot.use(session());

bot.use(Scenes.Stage.privateChat(stage.middleware()));
bot.catch((err) => {
    console.log(err);
});

// To start wizard after bot restart.
bot.command('/start', (ctx) => {
    try {
        ctx.scene.enter('super-wizard');
    } catch (error) {
        console.log(error);
    }
});

const lastMessage = [];

const hasHw = (ctx, hw, limit) => {
    if (!limit) {

        return hw.some((v) => ctx.message?.text?.toLowerCase().includes(v))
          || hw.some((v) => ctx.editedMessage?.text?.toLowerCase().includes(v));
    }

    if (hw.some((v) => ctx.message?.text?.toLowerCase().includes(v))) {
        const messageDate = +ctx.message?.date;
        const chatId = ctx.message?.chat?.id;

        const lastMessageDate = lastMessage[chatId] ?? 0;

        if (+messageDate >= +(lastMessageDate + 3 * 60)) {
            lastMessage[chatId] = ctx.message?.date;
            return true;
        }
    }

    return false;
};

let config;

bot.on(['message', 'edited_message'], async (ctx) => {
    // Check if it's forward from main channel.
    if (ctx.message?.forward_from_chat?.id == CHANNEL_ID) {
      return;
    }

    // Skip all checkings for admins.
    if (config.chatAdmins.includes(ctx.message?.from?.id)) {
      return;
    }

    if (hasHw(ctx, config.stopWords, 0)) {
        try {
            await ctx.deleteMessage(ctx.id);
        } catch (error) {
            console.log(error);
        }
    }

    const hasInfoHotWords = hasHw(ctx, config.infoHotWords, 1);
    const hasLinks = hasHw(ctx, config.links, 0);
    const hasTargetsHotWords = hasHw(ctx, config.targetsHotWords, 1);
    const hasInstallerHotWords = hasHw(ctx, config.installerWords, 1);

    if (hasInfoHotWords && config.infoHotWordsMessage.enabled) {
        await ctx.replyWithMarkdown(
            config.infoHotWordsMessage.message,
            {
                disable_web_page_preview: true,
            }
        );
    }

    if (hasLinks) {
        try {
            await ctx.deleteMessage(ctx.id);
            await ctx.telegram.sendMessage(
                ctx.from.id,
                `'${ctx.message.text}'\nВаш месадж було видалено\n\n`
            );

            if (config.linksMessage.enabled)
            await ctx.telegram.sendMessage(
                ctx.from.id,
                config.linksMessage.message,
                {parse_mode: 'Markdown'}
            );
        } catch (error) {
            console.log(error);
        }
    }

    if (hasTargetsHotWords && config.targetsHotWordsMessage) {
        await ctx.replyWithMarkdown(
            config.targetsHotWordsMessage.message,
            {
                disable_web_page_preview: true,
            }
        );
    }

    if (hasInstallerHotWords && config.installerHotWordsMessage) {
      await ctx.replyWithMarkdown(
        config.installerHotWordsMessage.message,
        {
          disable_web_page_preview: true,
        }
      );
    }
});
// end group logic.

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

(async () => {
    config = await require('./bot_config').fetch(bot);
    require('./cron').setup(bot, config);
    bot.launch({ dropPendingUpdates: true });
})().catch((err) => console.log(err));