import styled from 'styled-components';

import rescources_icon_money from '../../images/icons/icon_money.jpg';
import rescources_icon_iron from '../../images/icons/icon_iron.jpg';
import rescources_icon_fuel from '../../images/icons/icon_fuel.jpg';
import rescources_icon_gold from '../../images/icons/icon_gold.jpg';
import rescources_icon_energy from '../../images/icons/icon_energy.jpg';

export const ResourcesOverview = ({currentResource}) => {
  const IconArray = [
    rescources_icon_money,
    rescources_icon_iron,
    rescources_icon_fuel,
    rescources_icon_gold,
    rescources_icon_energy,
  ];

  return (
    <StyledRescourceContainer>
      {currentResource.map((currentRes, index) => (
        <StyledRescourceSection key={currentRes.id}>
          <StyledRescourceIcon alt={currentRes.name} src={IconArray[index]}></StyledRescourceIcon>
          <StyledRescourceParagraphNumber>{Math.floor(currentRes.value)}</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
      ))}
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
