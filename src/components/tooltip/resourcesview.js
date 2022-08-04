import styled from 'styled-components';
import {productionResources, calculateEachBuildingEnergy} from '../../util/ResourcenProduction';
import {useSelector} from 'react-redux';

export default function ResourcesView({isOpen, currentRess}) {
  const currentUserBuildings = useSelector(state => state.currentUserBuildings);
  const resNameUpperCase = currentRess ? currentRess.name.charAt(0).toUpperCase() + currentRess.name.slice(1) : '';

  let currentHourProduction = 0;
  let currentEnergyProduction = 0;
  let currentEnergyUsed = 0;

  if (currentRess) {
    if (currentRess.name !== 'gold') {
      const currentBuilding = currentUserBuildings.find(
        currentBuilding => currentBuilding.resourcesType === currentRess.name
      );
      const currentTotalEnergy = calculateEachBuildingEnergy(currentUserBuildings);

      currentTotalEnergy.forEach(energy => {
        if (energy < 0) {
          currentEnergyUsed += energy;
        } else {
          currentEnergyProduction += energy;
        }
      });

      currentHourProduction = productionResources(currentRess.name, currentUserBuildings);

    }
  }

  let tooltipPosition = 0;

  if (currentRess.name === 'money') {
    tooltipPosition = '5%';
  } else if (currentRess.name === 'iron') {
    tooltipPosition = '15%';
  } else if (currentRess.name === 'fuel') {
    tooltipPosition = '25%';
  } else if (currentRess.name === 'gold') {
    tooltipPosition = '35%';
  } else if (currentRess.name === 'energy') {
    tooltipPosition = '45%';
  }

  return (
    <>
      <StyledSection isOpen={isOpen} tooltipPosition={tooltipPosition}>
        <p>
          <strong>{resNameUpperCase}</strong>
        </p>
        <StyledP>
          <span>You have</span>
          <span>{Math.floor(currentRess.value)}</span>
        </StyledP>
        <StyledP>
          <span>{currentRess.name === 'energy' ? 'Current Production' : 'Current /h Production'}</span>
          <span>{currentRess.name === 'energy' ? currentEnergyProduction : currentHourProduction}</span>
        </StyledP>
        <StyledP>
          <span>{currentRess.name === 'energy' ? 'Current using' : ''}</span>
          <span>{currentRess.name === 'energy' ? currentEnergyUsed : ''}</span>
        </StyledP>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  position: absolute;
  top: 55px;
  left: ${props => props.tooltipPosition ?? props.tooltipPosition};
  background: black;
  color: white;
  width: 200px;
  height: 100px;
  border-radius: 7px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding: 5px;
  font-size: 14px;
`;

const StyledP = styled.p`
  display: flex;
  justify-content: space-between;
`;
