import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      light: string;
      white: string;
      gradient: string;
      gradient50: string;
      maskGradient: string;
      dark: string;
      dark50: string;
      dark25: string;
      dark5: string;
      dark2: string;
      shadow: string;
      error: string;
    };
  }
}