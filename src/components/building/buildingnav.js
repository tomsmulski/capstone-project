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

  const selectedBuildID = selectedBuilding.buildingId;

  return (
    <StyledSection>
      {gameBuildingsTypes.map(gameBuildingType => {
        const currentUserBuilding = currentUserBuildings.find(
          currentUserBuildings => currentUserBuildings.buildingId === gameBuildingType.id
        );

        const borderColor = gameBuildingType.id === selectedBuildID ? 'green' : 'black';

        const checkEnoughRescource = checkRescource(
          gameBuildingType,
          currentUserResources,
          currentUserBuilding.level + 1
        );

        const notEnoughRescource = checkEnoughRescource.buildPriceTextColor.find(color => color === 'red') || 'black';

        const buildingInProgress = currentUserBuildingInProgress.find(
          buildingInProgress => buildingInProgress.buildingId === gameBuildingType.id
        );

        const totalDiffTime =
          buildingInProgress !== undefined ? buildingInProgress.endTime - buildingInProgress.startTime : 0;

        const timeLeft =
          buildingInProgress !== undefined ? timeBuilder(Math.round(buildingInProgress.diffTime / 1000)) : '';

        let calcuTimeDifference =
          Math.round(totalDiffTime / 1000) -
          (timeLeft.length === 0 ? 0 : Math.round(buildingInProgress.diffTime / 1000));

        calcuTimeDifference = (calcuTimeDifference / Math.round(totalDiffTime / 1000)) * 100 - 100;

        return (
          <StyledUl key={gameBuildingType.id} borderColor={borderColor} notEnoughRescource={notEnoughRescource}>
            <StyledLiName>{gameBuildingType.name}</StyledLiName>
            <li>
              <StyledButton
                onClick={() => setSelectedBuilding(gameBuildingType.id)}
                calcuTimeDifference={-calcuTimeDifference}
              >
                <StyledImg src="" alt={gameBuildingType.name}></StyledImg>
              </StyledButton>
              {timeLeft.length > 0 ? <StyledTimeLeft>{timeLeft}</StyledTimeLeft> : ''}
            </li>
            <StyledLiLevel notEnoughRescource={notEnoughRescource}>Level: {currentUserBuilding.level}</StyledLiLevel>
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
  max-width: 100%;
  overflow: hidden;
  overflow-x: scroll;
`;

const StyledUl = styled.ul`
  border: 3px solid ${props => props.borderColor ?? props.borderColor};
  min-width: 140px;
  list-style: none;
  ${props =>
    props.notEnoughRescource === 'red'
      ? `background:repeating-linear-gradient(-55deg,#000, #000 10px,  #FF0000 10px,  #FF0000 20px); color:white;`
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
  color: ${props => (props.notEnoughRescource === 'red' ? 'white' : 'black')};
  padding-bottom: 3px;
  font-weight: bold;
`;

const StyledImg = styled.img`
  position: relative;
  min-width: 134px;
  min-height: 96px;
  opacity: 0.4;
  background: black;
`;

const StyledTimeLeft = styled.span`
  position: relative;
  bottom: 60px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  text-decoration: none;
  border: none;
  ${props =>
    props.calcuTimeDifference > 0
      ? 'background: linear-gradient(#777, #777 ' +
        props.calcuTimeDifference +
        '%, #FFF ' +
        props.calcuTimeDifference +
        '% );'
      : 0}
`;
