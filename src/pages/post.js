import fs from 'fs';
import showdown from 'showdown';
import Storage from 'vanilla-storage';

import { C, cache, render } from '../common';

const { STORE, UNSPLASH_PROPS } = C;
const converter = new showdown.Converter();

export default (req, res) => {
  const { params: { postUri } } = req;
  const keyCache = `post:${postUri}`;
  let html = cache.get(keyCache);

  if (!html) {
    const posts = new Storage(STORE.POSTS);
    posts.get('public');

    const post = posts.findOne({ uri: postUri });
    if (!post) throw new Error(`/${postUri} is not a valid url.`);

    const users = new Storage(STORE.USERS);
    users.get('admins');
    const author = users.findOne({ id: post.author });

    const uriFile = `posts/${post.uri}.md`;
    if (!fs.existsSync(uriFile)) throw new Error(`${uriFile} could not read correctly.`);


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
        author: author.name,
        avatar: author.avatar || '',
        markdown: converter.makeHtml(fs.readFileSync(uriFile, 'utf8')),
        bannerBlockchain: render('templates/bannerBlockchain', { type: 'post' }),
        bannerSubscribe: render('templates/bannerSubscribe', { type: 'post' }),
        footer: render('templates/footer'),
      }),
    });
  }

  cache.set(keyCache, html);

  res.send(html);
};
