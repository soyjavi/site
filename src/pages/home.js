import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    page: 'home',
    content: render('home'),
  }));
};
