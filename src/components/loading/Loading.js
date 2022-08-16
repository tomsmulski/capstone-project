import styled from 'styled-components';

export default function Loading() {
  return (
    <>
      <StyledDiv></StyledDiv>
      <StyledSpan>Loading</StyledSpan>
    </>
  );
}

const StyledSpan = styled.span`
  position: fixed;
  top: 59%;
  left: 50%;
  margin-top: -130px;
  margin-left: -30px;
  font-size: large;
  font-family: var(--font-family-primary);
  color: var(--color-primary);
`;


const StyledDiv = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -120px;
  margin-left: -60px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
