import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${({ theme }) => theme.colors.primary};
    --secondary: ${({ theme }) => theme.colors.secondary};
    --accent: ${({ theme }) => theme.colors.accent};
    --light: ${({ theme }) => theme.colors.light};
    --white: ${({ theme }) => theme.colors.white};
    --dark: ${({ theme }) => theme.colors.dark};
    --gradient: ${({ theme }) => theme.colors.gradient};
    --gradient-50: ${({ theme }) => theme.colors.gradient50};
    --mask-gradient: ${({ theme }) => theme.colors.maskGradient};
    --dark-80: ${({ theme }) => theme.colors.dark80};
    --dark-50: ${({ theme }) => theme.colors.dark50};
    --dark-25: ${({ theme }) => theme.colors.dark25};
    --dark-5: ${({ theme }) => theme.colors.dark5};
    --dark-2: ${({ theme }) => theme.colors.dark2};
    --shadow: ${({ theme }) => theme.colors.shadow};
    --error: ${({ theme }) => theme.colors.error};
  }
`;

export default GlobalStyle;
