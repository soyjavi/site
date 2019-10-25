import { C, rateBTC, render } from '../common';

const {
  ADDRESS_BTC, COURSE_AMOUNT_FIAT, COURSE_DISCOUNT_FIAT, DOMAIN,
} = C;

const addresses = ADDRESS_BTC.split(',');
const description = 'Construye desde cero una Blockchain y Criptomoneda. ¡Descubre las ideas de ingeniería detrás de tecnologías como Bitcoin y Ethereum!';

export default async (req, res) => {
  const address = addresses[Math.floor(Math.random() * addresses.length)];

  const amountBTC = await rateBTC(COURSE_DISCOUNT_FIAT);
  const exchangeRate = (COURSE_DISCOUNT_FIAT / amountBTC).toFixed(2);

  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    title: 'Curso Blockchain',
    description,
    image: `${DOMAIN}/static/banner-course.png`,
    content: render('course', {
      description,
      subscribe: render('banners/subscribe'),
      dialog: render('templates/dialogCheckout', {
        address,
        amountBTC,
        amountFIAT: COURSE_AMOUNT_FIAT,
        discountFIAT: COURSE_DISCOUNT_FIAT,
        externalUrl: 'https://www.udemy.com/course/aprende-blockchain/?couponCode=4FCED12CC5DBA7C6F7B6',
        context: 'CHECKOUT',
        exchangeRate,
      }),
      footer: render('templates/footer'),
    }),
  }));
};
