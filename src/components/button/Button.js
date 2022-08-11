import styled from 'styled-components';

export default function Button({disabled, buildId, buildTime, onHandleClick, buttonText}) {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={()=>onHandleClick(buildId,buildTime)}
    >
      {buttonText}
    </StyledButton>
  );
}


const StyledButton = styled.button`
  width: 120px;
  height: 30px;
  font-size: larger;
  margin: 0;
  cursor: pointer;
`;
