import { C, render } from '../common';

const { ADDRESS_BTC, COURSE_AMOUNT_FIAT, COURSE_AMOUNT_BTC } = C;
const IMAGE = '/static/course-blockchain-main.gif';

const addresses = ADDRESS_BTC.split(',');

export default (req, res) => {
  const address = addresses[Math.floor(Math.random() * addresses.length)];

  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    title: 'Curso Blockchain',
    description: 'Construye desde cero una Blockchain y Criptomoneda. ¡Descubre las ideas de ingeniería detrás de tecnologías como Bitcoin y Ethereum!',
    image: IMAGE,
    content: render('course', {
      image: IMAGE,
      bannerSubscribe: render('templates/bannerSubscribe', { type: 'course' }),
      dialog: render('templates/dialogCheckout', {
        address,
        amountBTC: COURSE_AMOUNT_BTC,
        amountFIAT: COURSE_AMOUNT_FIAT,
        externalUrl: 'https://www.udemy.com/course/aprende-blockchain/?couponCode=4FCED12CC5DBA7C6F7B6',
        context: 'CHECKOUT',
        exchangeRate: '??.?',
      }),
      footer: render('templates/footer'),
    }),
  }));
};
