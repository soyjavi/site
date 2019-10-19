import { render } from '../common';

const title = 'Mis afiliados';
const description = `
Estos son algunos de los productos que suelo utilizar en mi día a día. Sino los utilizaría muy probablemente no te los recomendaría.
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

      subscribe: render('banners/subscribe'),

      // dashlane: render('banners/dashlane'),
    }),
  }));
};
