import styled from 'styled-components';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {actionCreators} from '../../state';

export default function Header() {
  const {setOpenSideNavigation} = bindActionCreators(actionCreators, useDispatch());

  return (
    <StyledHeader>
      <StyledButton
        aria-label={'Side Navigation'}
        onClick={() => {
          setOpenSideNavigation(true);
        }}
      >
        <Icon icon="dashicons:menu-alt3" fontSize={'30px'} />
      </StyledButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  height: 70px;
  width: 100%;
`;

const StyledButton = styled.button`
  position: absolute;
  top: 20px;
  left: 10%;
  width: 36px;
  height: 30px;
  background: transparent;
  border: none;
  &:active {
    color: red;
  }
  @media screen and (min-width: 1100px) {
    display: none;
  }
`;
