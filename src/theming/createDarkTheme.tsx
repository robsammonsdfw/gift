import type { Theme } from '../theming/types';

const createDarkTheme = (backgroundColor: string): Theme => ({
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: backgroundColor,
    card: backgroundColor,
    text: 'rgb(229, 229, 231)',
    border: '#00ccff20',
    notification: 'rgb(255, 69, 58)',
  },
});

export default createDarkTheme;