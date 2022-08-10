import styled from 'styled-components';
import Images from '../../images';
import {Icon} from '@iconify/react';

import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {actionCreators} from '../../state';

export default function Sidenavigation({sideNavigationStatus}) {
  const {setOpenSideNavigation, setOpenManual} = bindActionCreators(actionCreators, useDispatch());

  return (
    <StyledNavigation isOpen={sideNavigationStatus} imageBackground={Images.background.imageBackgroundManual}>
      <StyledCloseButton
        onClick={() => {
          setOpenSideNavigation(false);
        }}
      >
        <Icon icon="akar-icons:arrow-left-thick" fontSize={'34px'} />
      </StyledCloseButton>
      <StyledDiv>
        <StyledManualButton
          onClick={() => {
            setOpenManual(true);
            setOpenSideNavigation(false);
          }}
        >
          <StyledSpan>📖</StyledSpan> Global Manual
        </StyledManualButton>
      </StyledDiv>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 40%;
  height: 100%;
  background: url(${props => props.imageBackground});
  top: 0;
  z-index: 99;
  border-radius: 0 20px 20px 0;
  animation: animateright 1.4s;
  @keyframes animateright {
    from {
      left: -300px;
      opacity: 0;
    }
    to {
      left: 0;
      opacity: 1;
    }
  }
  @media screen and (min-width: 500px) {
    width: 20%;
    height: 70%;
  }
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

const StyledSpan = styled.span`
  font-size: 20px;
`;
