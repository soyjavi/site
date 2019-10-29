import { cache, render } from '../common';

export default ({ originalUrl }, res) => res.send(
  cache.set(originalUrl,
    render('index', {
      page: 'home',
      content: render('home'),
    })),
);
