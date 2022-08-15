import styled from 'styled-components';

export default function Button({disabled, buildId, buildTime, onHandleClick, buttonText}) {
  return (
    <StyledButton type="button" disabled={disabled} onClick={() => onHandleClick(buildId, buildTime)}>
      {buttonText}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 180px;
  height: 40px;
  font-size: 18px;
  border: 0.5px solid var(--color-buildingname);
  border-radius: 5px;
  background-color: ${props => (props.disabled ? 'var(--color-gray)' : 'var(--color-green)')};
  margin: 0;
  cursor: pointer;
  font-family: var(--font-family-third);
  color: white;
  font-weight: bold;
  letter-spacing: 1px;
`;
