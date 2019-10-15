import on from './on';
import theme, { LIGHT, DARK } from './theme';

window.eaf = {
  on,
  theme,
};

// -- auto-config
// const { location: { protocol, href } } = window;
// if (protocol !== 'https:') window.location.href = `https:${href.substring(protocol.length)}`;

const currentHour = new Date().getHours();
theme.render((currentHour >= 19 || currentHour <= 6) ? DARK : LIGHT);
