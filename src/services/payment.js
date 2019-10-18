// import dotenv from 'dotenv';
import { C, mail, render } from '../common';

const { COURSE_AMOUNT_BTC } = C;

export default async ({ props: { email, address } }, res) => {
  let error = false;

  await mail({
    to: email,
    subject: 'Hemos recibido tu reserva',
    text: render('templates/mailPayment', { address, amount: COURSE_AMOUNT_BTC }),
  }).catch(() => { error = true; });

  await mail({
    subject: 'Nuevo pago - AprendeBlockchain',
    text: render('templates/mailPaymentAdmin', { address, email, amount: COURSE_AMOUNT_BTC }),
  }).catch(() => { error = true; });

  res.json({
    success: !error,
    email,
    address,
  });
};
