import { render } from '../common';

export default (error, req, res, next) => {
  if (res.headersSent) next(error);
  else {
    const { code = 400 } = error;
    const html = render('index', {
      page: 'error',
      context: 'error',
      content: render('error', {
        code,
        message: error.message,
        subscribe: render('banners/subscribe'),
      }),
    });

    res.status(code).send(html);
  }
};
