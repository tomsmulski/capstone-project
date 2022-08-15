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

        const borderColor = gameBuildingType.id === selectedBuildID ? 'var(--color-buildingname)' : 'black';

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

            <StyledLiLevel notEnoughRescource={notEnoughRescource}>Level : {currentUserBuilding.level}</StyledLiLevel>
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
  max-height: 138px;
  overflow: hidden;
  overflow-x: scroll;
  background: var(--background-buildingnav);
  @media screen and (min-width: 600px) {
    overflow-x: hidden;
  }
`;

const StyledUl = styled.ul`
  border: 2px solid ${props => props.borderColor ?? props.borderColor};
  min-width: 140px;
  max-width: 140px;
  list-style: none;
  cursor: pointer;
  ${props =>
    props.notEnoughRescource === 'red'
      ? `background-size: auto auto;
background-color: rgba(255, 0, 0, 0.8);
background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 1) 10px, rgba(0, 0, 0, 1) 20px ); color:white;`
      : ''};
`;

const StyledLiName = styled.li`
  background-color: black;
  color: white;
  text-align: right;
  font-size: 12px;
  font-family: var(--font-family-primary);
  padding: 2px;
`;

const StyledLiLevel = styled.li`
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  font-size: 14px;
  bottom: 22px;
  width: 100%;
  text-align: center;
  color: ${props => (props.notEnoughRescource === 'red' ? 'red' : 'white')};
  padding: 3px;
  font-weight: bold;
  font-family: var(--font-family-third);
`;

const StyledImg = styled.img`
  position: relative;
  width: 108px;
  margin: 0 14px;
`;

const StyledTimeLeft = styled.span`
  position: absolute;
  text-align: center;
  bottom: 70px;
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
      ? 'background: linear-gradient(#222, #222 ' +
        props.calcuTimeDifference +
        '%, var(--background-buildingnav) ' +
        props.calcuTimeDifference +
        '% );'
      : 0}
`;
