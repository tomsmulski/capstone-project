import styled from 'styled-components';
import './loading.css';


export default function Loading() {
    
  return (<>
    <div className="loader"></div>
    <StyledSpan>Loading</StyledSpan>
    </>
  )
}

const StyledSpan = styled.span`
    position: fixed;
    top: 57%;
    left: 50%;
    margin-top: -120px;
    margin-left: -30px;
    font-size: large;

`
