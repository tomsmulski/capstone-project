import styled from 'styled-components';
import Images from '../../images';
import {Icon} from '@iconify/react';

export default function Sidenavigation() {
  return (
    <StyledNavigation imageBackground={Images.background.imageBackgroundManual}>
      <StyledCloseButton>
        <Icon icon="akar-icons:arrow-back-thick-fill" fontSize={'30px'} />
      </StyledCloseButton>
      <StyledDiv>
        <StyledManualButton onClick={() => console.log(this)}>📖 Global Manual</StyledManualButton>
      </StyledDiv>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  width: 40%;
  height: 100%;
  background: url(${props => props.imageBackground});
  top: 0;

  @media screen and (min-width: 500px) {
    width: 20%;
    height: 70%;
  }

  z-index: 99;
  border-radius: 0 20px 20px 0;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 10%;
  width: 50px;
  height: 30px;
  background: transparent;
  border: none;

  &:active {
    color: red;
    opacity: 0.6;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  top: 100px;
  left: 5px;
`;

const StyledManualButton = styled.button`
  font-size: 14px;
  background: transparent;
  border: none;
  font-weight: bold;
`;
