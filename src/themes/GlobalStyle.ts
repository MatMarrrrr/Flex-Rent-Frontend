import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: ${({ theme }) => theme.colors.primary};
    --secondary-color: ${({ theme }) => theme.colors.secondary};
    --dark-color: ${({ theme }) => theme.colors.dark};
    --light-color: ${({ theme }) => theme.colors.light};
    --white-color: ${({ theme }) => theme.colors.white};
    --gradient: ${({ theme }) => theme.colors.gradient};
  }
`;

export default GlobalStyle;
