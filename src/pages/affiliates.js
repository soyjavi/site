import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    page: 'affiliates',
    context: 'afiliados',
    content: render('affiliates', {
      // banner: render('templates/banner'),
    }),
  }));
};
