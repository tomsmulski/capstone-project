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
    background-image: url(${props => props.imageBackground});
    background-size: cover;
    background-attachment: fixed;
  }
`;
