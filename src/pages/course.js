import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    content: render('course', {
      bannerSubscribe: render('templates/bannerSubscribe', { type: 'course' }),
      footer: render('templates/footer'),
    }),
  }));
};
