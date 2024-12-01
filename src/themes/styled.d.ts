import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      dark: string;
      light: string;
      white: string;
      gradient: string;
    };
  }
}