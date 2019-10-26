import fs from 'fs';
import path from 'path';
import showdown from 'showdown';

import { C, cache, render } from '../common';
import renderDialogCheckout from './modules/renderDialogCheckout';

const { AVATAR, NAME, UNSPLASH_PROPS } = C;
const converter = new showdown.Converter();

export default async (req, res) => {
  const { params: { postUri } } = req;
  const keyCache = `post:${postUri}`;
  let html = cache.get(keyCache);

  if (!html) {
    const file = path.resolve('.', `posts/${postUri}.md`);

    if (!fs.existsSync(file)) throw new Error(`/${postUri} is not a valid url.`);
    const markdown = fs.readFileSync(file, 'utf8');

    const [info, content] = markdown.split('---');
    const post = {};
    info.split('\n').forEach((row) => {
      const [field, value] = row.split(': ');
      if (field.trim().length > 0) post[field.trim()] = value.trim();
    });

    html = render('index', {
      page: 'post',
      context: 'blog',
      title: post.title,
      description: post.summary,
      image: `${post.image}${UNSPLASH_PROPS}&w=1200&h=900`,
      url: req.originalUrl,

      content: render('post', {
        ...post,
        image: `${post.image}${UNSPLASH_PROPS}&w=1366`,
        author: NAME,
        avatar: AVATAR,
        markdown: converter.makeHtml(content),
        banner: render('banners/course-blockchain'),
        bannerCoinbase: render('banners/coinbase'),
        subscribe: render('banners/subscribe'),
        dialog: await renderDialogCheckout(),
        footer: render('templates/footer'),
      }),

    });
  }

  cache.set(keyCache, html);

  res.send(html);
};
