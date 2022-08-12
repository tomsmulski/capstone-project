import {createGlobalStyle} from 'styled-components';
// Trick prettier into formatting "createGlobalStyle"
const styled = {createGlobalStyle};

export default styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    max-width: 800px;
    margin: 0 auto;
  }

  body {
    display: block;
    height: 100%;
    background: var(--background-main);
    font-family: 'Roboto', sans-serif;
  }

  :root {
    --background-main: #A14E33;
    --background-header: #A14E33;
    --background-resources: #936037;
    --background-tooltip: #025a7c;
    --background-sidenavigation: #025a7c;
    --background-front: #936037;
    --background-footer: #025a7c;
    --color-primary: #025a7c;
    --color-secondary: #ffb400;
    --font-family-primary : 'Playfair Display', serif;
    --font-family-secondary : 'Roboto Condensed', sans-serif;
    --font-family-third : 'Assistant', sans-serif;
  }
`;


