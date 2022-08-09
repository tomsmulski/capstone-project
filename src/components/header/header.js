import styled from 'styled-components';
import {Icon} from '@iconify/react';

export default function Header() {
  return (
    <StyledHeader>
      <StyledButton>
        <Icon icon="dashicons:menu-alt3" fontSize={'26px'} />
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
  width: 30px;
  height: 30px;
  background: transparent;
  border: 2px solid red;
  border-radius: 5px;

  &:active {
    color: red;
  }
`;
