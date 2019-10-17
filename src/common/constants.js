import dotenv from 'dotenv';

dotenv.config();
const {
  PRODUCTION,
  COPYRIGHT, DOMAIN, TITLE, DESCRIPTION, ICON, IMAGE,
  EMAIL, TWITTER,
} = process.env;

export default {
  ENV: {
    IS_PRODUCTION: PRODUCTION !== undefined,
  },

  // -- SITE
  COPYRIGHT,
  DOMAIN,
  TITLE,
  DESCRIPTION,
  ICON,
  IMAGE,

  // -- SOCIAL
  EMAIL,
  TWITTER,

  // -- API
  API: {
    HEADERS: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
  },

  // -- STORE
  STORE: {
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
