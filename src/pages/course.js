import { C, rateBTC, render } from '../common';

const {
  ADDRESS_BTC, COURSE_AMOUNT_FIAT, COURSE_DISCOUNT_FIAT,
} = C;

const addresses = ADDRESS_BTC.split(',');
const description = 'Construye desde cero una Blockchain y Criptomoneda. ¡Descubre las ideas de ingeniería detrás de tecnologías como Bitcoin y Ethereum!';

const IMAGES = [
  'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1563986768817-257bf91c5753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
];

const TITLES = [
  '¡Aprende Blockchain hoy mismo y conviértete en un CryptoDeveloper!',
  '¡Descubre Blockchain hoy y conviértete en el developer del futuro!',
];

export default async (req, res) => {
  const address = addresses[Math.floor(Math.random() * addresses.length)];
  const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];

  const amountBTC = await rateBTC(COURSE_DISCOUNT_FIAT);
  const exchangeRate = (COURSE_DISCOUNT_FIAT / amountBTC).toFixed(2);

  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    title,
    description,
    image,
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
