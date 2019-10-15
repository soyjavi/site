import { render } from '../common';

export default (req, res) => {
  res.send(render('index', {
    role: 'home',
    content: render('home'),
  }));
};
