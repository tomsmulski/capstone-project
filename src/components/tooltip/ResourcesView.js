import styled from 'styled-components';
import {productionResources, calculateEachBuildingEnergy} from '../../util/ResourcenProduction';
import {useSelector} from 'react-redux';

export default function ResourcesView({isOpen, currentResource}) {
  const currentUserBuildings = useSelector(state => state.currentUserBuildings);
  const resNameUpperCase = currentResource
    ? currentResource.name.charAt(0).toUpperCase() + currentResource.name.slice(1)
    : '';

  let currentHourProduction = 0;
  let currentEnergyProduction = 0;
  let currentEnergyUsed = 0;

  if (currentResource) {
    if (currentResource.name !== 'gold') {
      const currentTotalEnergy = calculateEachBuildingEnergy(currentUserBuildings);

      currentTotalEnergy.forEach(energy => {
        if (energy < 0) {
          currentEnergyUsed += energy;
        } else {
          currentEnergyProduction += energy;
        }
      });

      currentHourProduction = productionResources(currentResource.name, currentUserBuildings);
    }
  }

  return (
    <StyledSection isOpen={isOpen}>
      <StyledH3>{resNameUpperCase}</StyledH3>
      <hr />
      <StyledDiv2>
        <StyledDiv>
          <StyledSpan>You have</StyledSpan>
          <StyledSpan>{Math.floor(currentResource.value)}</StyledSpan>
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>{currentResource.name === 'energy' ? 'Current Production' : 'Current /h Production'}</StyledSpan>
          <StyledSpan>{currentResource.name === 'energy' ? currentEnergyProduction : currentHourProduction}</StyledSpan>
        </StyledDiv>
        <StyledDiv>
          <StyledSpan>{currentResource.name === 'energy' ? 'Current using' : ''}</StyledSpan>
          <StyledSpan>{currentResource.name === 'energy' ? currentEnergyUsed : ''}</StyledSpan>
        </StyledDiv>
      </StyledDiv2>
    </StyledSection>
  );
}

const StyledH3 = styled.h3`
  font-family: var(--font-family-secondary);
`;

const StyledSection = styled.section`
  position: absolute;
  top: 65px;
  background: var(--background-tooltip);
  color: white;
  width: 220px;
  height: 100px;
  border-radius: 7px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding: 5px;
  font-size: 14px;
  left: 25%;
  z-index: 1;
`;

const StyledDiv2 = styled.div`
  position: relative;
  display: block;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 3px;
  z-index: 1;
`;

const StyledDiv = styled.div`
  position: relative;
  padding-top: 3px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledSpan = styled.span`
  font-family: var(--font-family-third);
  margin: 0;
`;
