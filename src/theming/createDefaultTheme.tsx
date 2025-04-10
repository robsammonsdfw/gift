import type { Theme } from '../theming/types';

const createDefaultTheme = (backgroundColor: string): Theme => ({
  dark: false,
  colors: {
    primary: 'rgb(0, 122, 255)',
    background: backgroundColor,
    card: backgroundColor,
    text: 'rgb(28, 28, 30)',
    border: '#00ccff20',
    notification: 'rgb(255, 59, 48)',
  },
});

export default createDefaultTheme;