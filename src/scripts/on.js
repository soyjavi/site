import theme, { LIGHT, DARK } from './theme';
import { isEmail, queryString } from './modules';

const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'X-Requested-With': 'XMLHttpRequest',
};

const inputEmail = document.querySelector('#email');
if (inputEmail) {
  inputEmail.addEventListener('keyup', ({ target: { value } }) => {
    const el = document.querySelector('button[data-role="submit"]');

    if (isEmail(value)) el.removeAttribute('disabled');
    else el.setAttribute('disabled', '');
  });
}

export default {
  scroll(callback) {
    document.onscroll = () => callback(window.scrollY);
  },

  toggleTheme() {
    theme.render(theme.current === LIGHT ? DARK : LIGHT);
  },

  dialogShow(id) {
    const el = document.querySelector(`.dialog.${id}`);
    if (el) el.classList.add('visible');
  },

  dialogHide() {
    const el = document.querySelector('.dialog.visible');
    if (el) el.classList.remove('visible');
  },

  async paymentBTC(el) {
    const [{ value: email }, { value: address }] = el.parentNode.children;

    if (!isEmail(email)) return;

    el.setAttribute('disabled', '');
    el.classList.add('busy');
    el.innerHTML = 'Reservando...';

    const response = await fetch('/api/payment', {
      headers: { ...HEADERS },
      method: 'POST',
      body: queryString({ email, address }),
    }).catch(e => console.error(e));

    let success = false;
    if (response) {
      const json = await response.json();
      success = json.success || false;
    }

    if (success) {
      el.innerHTML = 'Reserva confirmada!';
      el.classList.remove('primary');
    } else {
      el.innerHTML = 'He realizado el pago';
    }
    el.classList.remove('busy');
    el.removeAttribute('disabled', '');
  },
};
