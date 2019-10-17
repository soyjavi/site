import theme, { LIGHT, DARK } from './theme';

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
};
