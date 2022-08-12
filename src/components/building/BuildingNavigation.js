import styled from 'styled-components';
import {bindActionCreators} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators} from '../../state';
import {checkRescource} from '../../util/checkResources';
import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import {timeBuilder} from '../../util/BuildingTime';
import Images from '../../images';

export const BuildingNavigation = ({currentUserBuildings, selectedBuilding}) => {
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

        const notEnoughRescource = checkEnoughRescource.buildPriceTextColor.find(color => color === 'red') || 'white';

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
                <StyledImg src={Images.image[gameBuildingType.image]} alt={gameBuildingType.name}></StyledImg>
              </StyledButton>
              {timeLeft.length > 0 ? <StyledTimeLeft>{timeLeft}</StyledTimeLeft> : ''}
            </li>

            <StyledLiLevel notEnoughRescource={notEnoughRescource}>{currentUserBuilding.level}</StyledLiLevel>
          </StyledUl>
        );
      })}
    </StyledSection>
  );
};

const StyledSection = styled.section`
  position: absolute;
  display: flex;
  flex-direction: row;
  max-width: 100%;
  max-height: 160px;
  overflow: hidden;
  overflow-x: scroll;

  @media screen and (min-width: 600px) {
    overflow-x: hidden;
  }
`;

const StyledUl = styled.ul`
  border: 3px solid ${props => props.borderColor ?? props.borderColor};
  min-width: 140px;
  max-width: 140px;
  list-style: none;
  cursor: pointer;
  ${props =>
    props.notEnoughRescource === 'red'
      ? `background:repeating-linear-gradient(-55deg,#000, #000 10px,  #FF0000 10px,  #FF0000 20px); color:white;`
      : ''};
`;

const StyledLiName = styled.li`
  background-color: black;
  color: white;
  text-align: right;
  font-size: 14px;
  font-family: var(--font-family-primary);
`;

const StyledLiLevel = styled.li`
  position: relative;
  border: 1px solid black;
  border-radius: 50%;
  font-size: 14px;
  bottom: 130px;
  left: 50px;
  width: 30px;
  height: 30px;
  text-align: center;
  color: ${props => (props.notEnoughRescource === 'red' ? 'red' : 'white')};
  padding: 3px;
  font-weight: bold;
  font-family: var(--font-family-third);
`;

const StyledImg = styled.img`
  position: relative;

`;

const StyledTimeLeft = styled.span`
  position: absolute;
  text-align: center;
  bottom: 80px;
  display: inline;
  color: black;
  font-weight: bold;
  width: 134px;
`;

const StyledButton = styled.div`
  text-decoration: none;
  border: none;
  ${props =>
    props.calcuTimeDifference > 0
      ? 'background: linear-gradient(#777, #777 ' +
        props.calcuTimeDifference +
        '%, #e2c28b ' +
        props.calcuTimeDifference +
        '% );'
      : 0}
`;
