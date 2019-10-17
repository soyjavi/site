const LIGHT = 0;
const DARK = 1;

export { LIGHT, DARK };

export default {
  current: LIGHT,

  render(next = LIGHT) {
    if (next === this.current) return;

    this.current = next;
    const root = document.documentElement;
    const colors = next === DARK
      ? {
        bg: '#111',
        bgOpacity: 'rgba(16,16,16,0.85)',
        color: 'white',
        colorLighten: '#999',
        colorSkeleton: '#222',
      }
      : {
        bg: 'white',
        bgOpacity: 'rgba(255,255,255,0.85)',
        color: '#333',
        colorLighten: '#666',
        colorSkeleton: '#edf1f5',
      };

    root.style.setProperty('--bg-color', colors.bg);
    root.style.setProperty('--bg-opacity', colors.bgOpacity);
    root.style.setProperty('--color', colors.color);
    root.style.setProperty('--color-lighten', colors.colorLighten);
    root.style.setProperty('--color-skeleton', colors.colorSkeleton);
    root.style.setProperty('--color-chart-line', colors.colorChartLine);
  },
};
