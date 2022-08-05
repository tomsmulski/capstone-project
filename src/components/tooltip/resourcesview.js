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

  return (
    <StyledSection isOpen={isOpen}>
      <p>
        <strong>{resNameUpperCase}</strong>
      </p>
      <hr />
      <StyledSpan>
        <span>You have</span>
        <span>{Math.floor(currentRess.value)}</span>
      </StyledSpan>
      <StyledSpan>
        <span>{currentRess.name === 'energy' ? 'Current Production' : 'Current /h Production'}</span>
        <span>{currentRess.name === 'energy' ? currentEnergyProduction : currentHourProduction}</span>
      </StyledSpan>
      <StyledSpan>
        <span>{currentRess.name === 'energy' ? 'Current using' : ''}</span>
        <span>{currentRess.name === 'energy' ? currentEnergyUsed : ''}</span>
      </StyledSpan>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: absolute;
  top: 55px;
  background: black;
  color: white;
  width: 220px;
  height: 100px;
  border-radius: 7px;
  display: ${props => (props.isOpen ? 'block' : 'none')};
  padding: 5px;
  font-size: 14px;
  left: 20%;
`;

const StyledSpan = styled.span`
  padding-top: 3px;
  display: flex;
  justify-content: space-between;
`;
