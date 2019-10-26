import { C, rateBTC, render } from '../../common';

const {
  ADDRESS_BTC, COURSE_AMOUNT_FIAT, COURSE_DISCOUNT_FIAT,
} = C;

const addresses = ADDRESS_BTC.split(',');

export default async () => {
  const address = addresses[Math.floor(Math.random() * addresses.length)];
  const amountBTC = await rateBTC(COURSE_DISCOUNT_FIAT);
  const exchangeRate = (COURSE_DISCOUNT_FIAT / amountBTC).toFixed(2);

  return render('templates/dialogCheckout', {
    address,
    amountBTC,
    amountFIAT: COURSE_AMOUNT_FIAT,
    discountFIAT: COURSE_DISCOUNT_FIAT,
    externalUrl: 'https://www.udemy.com/course/aprende-blockchain/?couponCode=4FCED12CC5DBA7C6F7B6',
    context: 'CHECKOUT',
    exchangeRate,
  });
};
