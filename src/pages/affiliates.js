import { cache, render } from '../common';

const title = 'Mis afiliados';
const description = `
Estos son algunos de los productos y servicios que me acompañan en mi día a día. Sino los utilizaría ten por seguro que no te los podría recomendar. Aprovecha los descuentos especiales y así me ayudas a mantener este sitio.

`;

export default ({ originalUrl }, res) => res.send(
  cache.set(originalUrl,
    render('index', {
      page: 'post',
      context: 'afiliados',
      title,
      description,
      content: render('affiliates', {
        title,
        description,

        binance: render('banners/binance'),
        coinbase: render('banners/coinbase'),
        dashlane: render('banners/dashlane'),
        ledger: render('banners/ledger'),
        trezor: render('banners/trezor'),
        bullionstar: render('banners/bullionstar'),

        course: render('banners/course-blockchain'),
        subscribe: render('banners/subscribe'),
      }),
    })),
);
