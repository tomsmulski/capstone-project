import styled from 'styled-components';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {actionCreators} from '../../state';

export default function SideNavigation({sideNavigation}) {
  const {setOpenSideNavigation, setOpenManual} = bindActionCreators(actionCreators, useDispatch());

  return (
    <StyledNavigation isOpen={sideNavigation.status}>
      <StyledCloseButton
        aria-label={'Close Side Navigation'}
        onClick={() => {
          setOpenSideNavigation(false);
        }}
      >
        <Icon icon="ant-design:arrow-left-outlined" fontSize={'30px'} />
      </StyledCloseButton>
      <StyledDiv>
        <StyledManualButton
          aria-label={'Global Manual'}
          onClick={() => {
            setOpenManual(true);
          }}
        >
          <StyledSpan>
            <Icon icon="bi:book" />
          </StyledSpan>
          <StyledNameSpan>Global Manual</StyledNameSpan>
        </StyledManualButton>
      </StyledDiv>
    </StyledNavigation>
  );
}

const StyledNavigation = styled.nav`
  position: fixed;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 250px;
  height: 100%;
  background: var(--background-sidenavigation);
  top: 0;
  z-index: 99;
  border-right: 0.5px solid #80848b;
  animation: animateright 0.9s;
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
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    display: absolute;
    left: 0;
  }
  @media screen and (min-width: 1100px) {
    position: absolute;
    display: flex;
    left: 0;
    background: transparent;
    border: none;
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
  color: white;
  cursor: pointer;
  &:active {
    color: red;
  }

  @media screen and (min-width: 1100px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  position: absolute;
  top: 100px;
  left: 5px;
`;

const StyledManualButton = styled.button`
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 16px;
  height: 42px;
  background: transparent;
  border: none;
  font-weight: bold;
  font-family: var(--font-family-third);
  color: var(--color-primary);
  cursor: pointer;
  @media screen and (min-width: 1100px) {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: 3px;
    font-size: 18px;
    display: flex;
  }
`;

const StyledSpan = styled.span`
  font-size: 26px;
  border: 0.5px solid var(--color-primary);
  border-radius: 5px;
  background: #121212;
  padding: 6px 6px 0 6px;
`;

const StyledNameSpan = styled.span`
  font-size: 18px;
  padding-left: 10px;
`;
