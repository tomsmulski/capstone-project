
import styled from "styled-components";
import rescources_icon_money from '../../images/icons/icon_money.jpg';
import rescources_icon_iron from '../../images/icons/icon_iron.jpg';
import rescources_icon_fuel from '../../images/icons/icon_fuel.jpg';
import rescources_icon_gold from '../../images/icons/icon_gold.jpg';
import rescources_icon_energy from '../../images/icons/icon_energy.jpg';

export const ResourcesOverview = () => {


    return (
      <StyledRescourceContainer>
        <StyledRescourceSection>
            <StyledRescourceIcon alt="Money" src={rescources_icon_money}></StyledRescourceIcon>
            <StyledRescourceParagraphNumber>1.000</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
        <StyledRescourceSection>
            <StyledRescourceIcon alt="Iron" src={rescources_icon_iron}></StyledRescourceIcon>
            <StyledRescourceParagraphNumber>500</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
        <StyledRescourceSection>
            <StyledRescourceIcon alt="Fuel" src={rescources_icon_fuel}></StyledRescourceIcon>
            <StyledRescourceParagraphNumber>0</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
        <StyledRescourceSection>
            <StyledRescourceIcon alt="Gold" src={rescources_icon_gold}></StyledRescourceIcon>
            <StyledRescourceParagraphNumber>0</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
        <StyledRescourceSection>
            <StyledRescourceIcon alt="Energy" src={rescources_icon_energy}></StyledRescourceIcon>
            <StyledRescourceParagraphNumber>0</StyledRescourceParagraphNumber>
        </StyledRescourceSection>

      </StyledRescourceContainer>
    );
  };



const StyledRescourceContainer = styled.div`
    margin-top: 80px;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    
  
`;

const StyledRescourceSection = styled.section`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledRescourceParagraphNumber = styled.p`
    font-size: larger;
  
`;

const StyledRescourceIcon = styled.img`
  padding: auto;
  width: 34px;
  height: 34px;
 
`;


