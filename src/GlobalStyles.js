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
    background: var(--background-body);
    font-family: 'Roboto', sans-serif;
  }

  :root {
    --background-main: #1c252c;
    --background-body: #1c252c;
    --background-header: #122836;
    --background-resources: #15141e;
    --background-buildingnav: #15141e;
    --background-manual: #1d1f28;
    --background-tooltip: #1c252c;
    --background-sidenavigation: #1c252c;
    --background-front-title: #15141e;
    --background-card: #030614;
    --background-front: #13151c;
    --background-footer: #122836;
    --color-primary: #d4d2d4;
    --color-secondary: #57575c;
    --color-buildingname: #ec9044;
    --color-green: #478106;
    --color-gray: #6f6e6f;
    --font-family-primary: 'Playfair Display', serif;
    --font-family-secondary: 'Roboto Condensed', sans-serif;
    --font-family-third: 'Assistant', sans-serif;
  }
`;
