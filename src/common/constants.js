import dotenv from 'dotenv';

dotenv.config();
const {
  PRODUCTION,
  DOMAIN, EMAIL, TITLE, DESCRIPTION,
  ALPHAVANTAGE, CRYPTOPANIC,
  BOT, BOT_ARTICLES, CHANNEL_TRADERBOT, CHANNEL_ADMIN,
  WALLET_KEY, WALLET_XPUB,
} = process.env;

export default {
  ENV: {
    IS_PRODUCTION: PRODUCTION !== undefined,
    ALPHAVANTAGE,
    CRYPTOPANIC,
    BOT,
    BOT_ARTICLES,
    CHANNEL_ADMIN,
    CHANNEL_TRADERBOT,
    WALLET_KEY,
    WALLET_XPUB,
  },

  // -- SITE
  DOMAIN,
  EMAIL,
  TITLE,
  DESCRIPTION,
  FAVICON: '/favicon-app.png',

  // -- API
  API: {
    HEADERS: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },

  // -- STORE
  STORE: {
    BOTS: {
      filename: 'bots',
      defaults: {
        articles: [],
        traderbot: [],
      },
    },
    PAYMENTS: {
      filename: 'payments',
      defaults: { orders: [] },
    },
    POSTS: {
      filename: 'posts',
      defaults: { public: [], private: [] },
    },
    USERS: {
      filename: 'users',
      defaults: {
        admins: [],
        subscribers: [],
        bot: [],
        course: [],
        report: [],
      },
    },
  },

  TELEGRAM_PROPS: { parse_mode: 'Markdown', disable_web_page_preview: true },

  UNSPLASH_PROPS: '?ixlib=rb-1.2.1&auto=format&fit=crop&q=80',
};
