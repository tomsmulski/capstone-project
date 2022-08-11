import styled from 'styled-components';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators} from '../../state';
import {useEffect} from 'react';

export default function Header() {
  const {setOpenSideNavigation} = bindActionCreators(actionCreators, useDispatch());
  const sideNavigationStatus = useSelector(state => state.sideNavigation);
  useEffect(() => {
    if (sideNavigationStatus.status) {
      window.addEventListener('click', handleClick, false);

      return () => {
        window.removeEventListener('click', handleClick, false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideNavigationStatus]);

  function handleClick(event) {
    event.stopPropagation();
    if (sideNavigationStatus.status && sideNavigationStatus.click) {
      setOpenSideNavigation(true);
    } else {
      setOpenSideNavigation(false);
    }
  }

  return (
    <StyledHeader>
      <StyledButton
        aria-label={'Side Navigation'}
        onClick={() => {
          setOpenSideNavigation(true, true);
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
  cursor: pointer;
  &:active {
    color: red;
  }
  @media screen and (min-width: 1100px) {
    display: none;
  }
`;
