import styled from 'styled-components';

import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators} from '../../state';

import {checkRescource} from '../../util/checkResources';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import {timeBuilder} from '../../util/BuildingTime';

export const Buildingnav = ({currentUserBuildings, selectedBuilding}) => {
  const {setSelectedBuilding} = bindActionCreators(actionCreators, useDispatch());
  const currentUserResources = useSelector(state => state.currentUserResources);
  const currentUserBuildingInProgress = useSelector(state => state.currentUserBuildingInProgress);

  return (
    <StyledSection>
      {gameBuildingsTypes.map(gameBuildingType => {
        const currentUserBuilding = currentUserBuildings.find(
          currentUserBuildings => currentUserBuildings.buildingId === gameBuildingType.id
        );

        const selectedBuildID = selectedBuilding.buildingId;

        let borderColor = 'black';

        if (gameBuildingType.id === selectedBuildID) {
          borderColor = 'green';
        }

        const checkEnoughRescource = checkRescource(
          gameBuildingType,
          currentUserResources,
          currentUserBuilding.level + 1
        );
        let notEnoughRescource = checkEnoughRescource.buildPriceTextColor.find(color => color === 'red');

        if (notEnoughRescource === undefined) {
          notEnoughRescource = 'black';
        }

        const buildingInProgress = currentUserBuildingInProgress.find(
          buildingInProgress => buildingInProgress.buildingId === gameBuildingType.id
        );

        let timeLeft = '';

        if (buildingInProgress !== undefined) {
          timeLeft = timeBuilder(Math.round(buildingInProgress.diffTime / 1000));
        }

        return (
          <StyledUl key={gameBuildingType.id} borderColor={borderColor} notEnoughRescource={notEnoughRescource}>
            <StyledLiName>{gameBuildingType.name}</StyledLiName>
            <li>
              {timeLeft.length > 0 ? <StyledTimeLeft>{timeLeft}</StyledTimeLeft> : ''}
              <StyledButton onClick={() => setSelectedBuilding(gameBuildingType.id)}>
                <StyledImg src="" alt={gameBuildingType.name}></StyledImg>
              </StyledButton>
            </li>
            <StyledLiLevel>Level: {currentUserBuilding.level}</StyledLiLevel>
          </StyledUl>
        );
      })}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  position: absolute;
  height: 120px;
  display: flex;
  flex-direction: row;
  max-width: 375px;
  overflow: hidden;
  overflow-x: scroll;
  scrollbar-width: none;

  @media screen and (min-width: 400px) {
    max-width: 100%;
    overflow-x: hidden;
  }
`;

const StyledUl = styled.ul`
  border: 3px solid ${props => props.borderColor ?? props.borderColor};
  min-width: 140px;
  list-style: none;
  ${props =>
    props.notEnoughRescource === 'red'
      ? `background:repeating-linear-gradient(-55deg,#222, #222 10px,  #333 10px,  #333 20px)`
      : ''};
`;

const StyledLiName = styled.li`
  background-color: black;
  color: white;
  text-align: right;
`;

const StyledLiLevel = styled.li`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 140px;
  text-align: center;
  color: white;
  padding-bottom: 3px;
`;

const StyledImg = styled.img`
  min-width: 134px;
  min-height: 96px;
  opacity: 0.4;
  background: black;
`;

const StyledTimeLeft = styled.span`
  position: relative;
  top: 40px;
  left: 60px;
  z-index: 2;
`;

const StyledButton = styled.div`
  text-decoration: none;
  border: none;
  position: absolute;
`;
