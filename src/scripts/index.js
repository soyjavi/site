import countdown from './countdown';
import on from './on';
import theme from './theme';

window.soyjavi = {
  on,
  theme,
};

countdown('Nov 1, 2019 08:00:00');

on.scroll((height) => {
  const el = document.querySelector('header');
  el.classList[height > 100 ? 'add' : 'remove']('shadow');
});
