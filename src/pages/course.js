import { render } from '../common';

const IMAGE = '/static/course-blockchain-main.gif';

export default (req, res) => {
  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    title: 'Curso Blockchain',
    description: 'Construye desde cero una Blockchain y Criptomoneda. ¡Descubre las ideas de ingeniería detrás de tecnologías como Bitcoin y Ethereum!',
    image: IMAGE,
    content: render('course', {
      image: IMAGE,
      bannerSubscribe: render('templates/bannerSubscribe', { type: 'course' }),
      dialog: render('templates/dialogCheckout'),
      footer: render('templates/footer'),
    }),
  }));
};
