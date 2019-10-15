import Storage from 'vanilla-storage';

import { C, render } from '../common';

const { STORE, UNSPLASH_PROPS } = C;

export default (req, res) => {
  const posts = new Storage(STORE.POSTS);
  const users = new Storage(STORE.USERS);
  let postItems = '';
  let featured = '';

  users.get('admins');
  posts.get('public').value
    .forEach((post) => {
      const author = users.findOne({ id: post.author });
      const itemProps = {
        ...post,
        author: author.name,
        image: `${post.image}${UNSPLASH_PROPS}&w=${post.featured ? '640' : '192'}`,
        class: post.featured ? 'featured' : undefined,
      };

      if (post.featured) featured += render('post-item', itemProps);
      else postItems += render('post-item', itemProps);
    });

  res.send(render('index', {
    role: 'blog',
    content: render('blog', {
      banner: render('templates/banner'),
      bannerSmall: render('templates/banner', { type: 'small' }),
      bannerCourse: render('templates/banner', { type: 'small' }),
      posts: postItems,
      featured,
    }),
  }));
};
