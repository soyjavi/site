import fs from 'fs';
import path from 'path';
import showdown from 'showdown';

import { C, cache, render } from '../common';
import renderDialogCheckout from './modules/renderDialogCheckout';

const { AVATAR, NAME, UNSPLASH_PROPS } = C;
const converter = new showdown.Converter();
const BANNERS = ['bullionstar', 'coinbase', 'dashlane', 'ledger', 'trezor'];

export default async ({ originalUrl, params: { postUri } }, res) => {
  const file = path.resolve('.', `posts/${postUri}.md`);

  const markdown = fs.readFileSync(file, 'utf8');
  const [info, content] = markdown.split('---');
  const post = {};
  info.split('\n').forEach((row) => {
    const [field, value] = row.split(': ');
    if (field.trim().length > 0) post[field.trim()] = value.trim();
  });

  const html = render('index', {
    page: 'post',
    context: 'blog',
    title: post.title,
    description: post.summary,
    image: `${post.image}${UNSPLASH_PROPS}&w=1200&h=900`,
    url: originalUrl,

    content: render('post', {
      ...post,
      image: `${post.image}${UNSPLASH_PROPS}&w=1366`,
      author: NAME,
      avatar: AVATAR,
      markdown: converter.makeHtml(content),
      banner: render('banners/course-blockchain'),
      bannerCoinbase: render('banners/coinbase'),
      bannerRandom: render(`banners/${BANNERS[Math.floor(Math.random() * BANNERS.length)]}`),
      subscribe: render('banners/subscribe'),
      dialog: await renderDialogCheckout(),
      footer: render('templates/footer'),
    }),
  });

  cache.set(originalUrl, html);

  res.send(html);
};
