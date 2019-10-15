import { render } from '../common';

export default (error, req, res, next) => {
  if (res.headersSent) next(error);
  else {
    const { code = 400 } = error;
    const html = render('index', {
      main: JSON.stringify({ code, error: error.message }),
    });

    res.status(code).send(html);
  }
};
