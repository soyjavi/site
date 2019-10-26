import { render } from '../common';

const title = 'Mis afiliados';
const description = `
Estos son algunos de los productos y servicios que me acompañan en mi día a día. Sino los utilizaría ten por seguro que no te los podría recomendar. Aprovecha los descuentos especiales y así me ayudas a mantener este sitio.

`;

export default (req, res) => {
  res.send(render('index', {
    page: 'post',
    context: 'afiliados',
    title,
    description,
    content: render('affiliates', {
      title,
      description,

      coinbase: render('banners/coinbase'),
      dashlane: render('banners/dashlane'),
      ledger: render('banners/ledger'),
      trezor: render('banners/trezor'),

      course: render('banners/course-blockchain'),
      subscribe: render('banners/subscribe'),
    }),
  }));
};
