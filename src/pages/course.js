import { C, render } from '../common';

import renderDialogCheckout from './modules/renderDialogCheckout';

const { COURSE_DISCOUNT_FIAT } = C;
const description = 'Construye desde cero una Blockchain y Criptomoneda. ¡Descubre las ideas de ingeniería detrás de tecnologías como Bitcoin y Ethereum!';

const IMAGES = [
  'https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1563986768817-257bf91c5753?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=80',
];

const TITLES = [
  '¡Aprende Blockchain hoy mismo y conviértete en un CryptoDeveloper!',
  '¡Descubre Blockchain hoy y conviértete en el developer del futuro!',
  '¡Aprende Blockchain hoy y transforma tu futuro!',
];

export default async (req, res) => {
  const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];

  res.send(render('index', {
    page: 'course',
    context: 'CURSOS',
    title,
    description,
    image,
    content: render('course', {
      description,
      offerPrice: COURSE_DISCOUNT_FIAT,
      subscribe: render('banners/subscribe'),
      dialog: await renderDialogCheckout(),
      footer: render('templates/footer'),
    }),
  }));
};
