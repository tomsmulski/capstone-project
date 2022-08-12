import styled from 'styled-components';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators} from '../../state';
import {useEffect} from 'react';

export default function Header() {
  const {setOpenSideNavigation} = bindActionCreators(actionCreators, useDispatch());
  const sideNavigation = useSelector(state => state.sideNavigation);
  useEffect(() => {
    if (sideNavigation.status) {
      window.addEventListener('click', handleClick, false);

      return () => {
        window.removeEventListener('click', handleClick, false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sideNavigation]);

  function handleClick(event) {
    event.stopPropagation();
    if (sideNavigation.status && sideNavigation.click) {
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
  height: 80px;
  width: 100%;
  background: var(--background-header);
`;

const StyledButton = styled.button`
  position: absolute;
  top: 35px;
  left: 5%;
  width: 36px;
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
