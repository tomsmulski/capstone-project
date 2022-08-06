import {buildingPrice} from '../../util/BuildingPrice';
import {buildingTime} from '../../util/BuildingTime';
import Buildingcard from './buildingcard';
import {bindActionCreators} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators} from '../../state';
import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import {checkRescource} from '../../util/checkResources';

export const Building = ({selectedBuilding}) => {
  const {removeResources, addBuildingToBuild} = bindActionCreators(actionCreators, useDispatch());

  const currentUserResources = useSelector(state => state.currentUserResources);
  const currentUserBuildings = useSelector(state => state.currentUserBuildings);
  const currentUserBuildingInProgress = useSelector(state => state.currentUserBuildingInProgress);

  function onHandleClickUpgrade(e) {
    const buildingId = e.target.dataset.buildid;
    const buildingBuildTime = e.target.dataset.buildtime;

    if (currentUserBuildingInProgress.length === 0) {
      const currentBuilding = currentUserBuildings.find(currentBuilding => currentBuilding.buildingId === buildingId);
      const nextBuildingLevel = currentBuilding.level + 1;
      const progressBuildingTime = buildingBuildTime * 1000;

      const startBuildingTime = Date.now();
      const endBuildingTime = startBuildingTime + progressBuildingTime;

      addBuildingToBuild(0, buildingId, startBuildingTime, endBuildingTime, progressBuildingTime, nextBuildingLevel);

      const buildingType = gameBuildingsTypes.find(buildingType => buildingType.id === buildingId);

      buildingType.buildMaterials.forEach(material => {
        if (material.resourceType !== 'energy') {
          removeResources(
            material.resourceType,
            buildingPrice(nextBuildingLevel, buildingType.id, material.resourceType)
          );
        }
      });
    }
  }

  const gameBuildingType = gameBuildingsTypes.find(
    gameBuildingType => gameBuildingType.id === selectedBuilding.buildingId
  );

  const currentUserBuilding = currentUserBuildings.find(
    userBuilding => userBuilding.buildingId === gameBuildingType.id
  );

  let buttonTexts = 'Build';

  if (currentUserBuildingInProgress.length > 0) {
    const inProgressId = currentUserBuildingInProgress[0].buildingId;
    buttonTexts = inProgressId === gameBuildingType.id ? 'in Progress' : buttonTexts;
  }

  buttonTexts = currentUserBuilding.level > 0 && buttonTexts !== 'in Progress' ? 'Upgrade' : buttonTexts;

  const nextLevel = currentUserBuilding.level + 1;

  let buildPrice = [];
  gameBuildingType.buildMaterials.forEach(material => {
    if (material.resourceType === 'money' || material.resourceType === 'iron') {
      buildPrice.push(buildingPrice(nextLevel, gameBuildingType.id, material.resourceType));
    }
  });
  const buildTime = buildingTime(
    buildPrice[0] !== undefined ? buildPrice[0] : 0,
    buildPrice[1] !== undefined ? buildPrice[1] : 0
  );

  const buildInProgressButtonDisable = currentUserBuildingInProgress.length === 0 ? false : true;

  const checkEnoughRescource = checkRescource(gameBuildingType, currentUserResources, nextLevel);

  return (
    <article>
      <Buildingcard
        buildType={0}
        buildId={gameBuildingType.id}
        buildName={gameBuildingType.name}
        buildDescription={gameBuildingType.description}
        buildTime={buildTime}
        buildPrice={gameBuildingType.buildMaterials}
        buildPriceTextColor={checkEnoughRescource.buildPriceTextColor}
        buildYield={gameBuildingType.productionMaterials}
        currentBuildLevel={currentUserBuilding.level}
        buttonText={buttonTexts}
        buttonDisabled={checkEnoughRescource.notEnoughResourceButtonDisable || buildInProgressButtonDisable}
        buttonFunction={onHandleClickUpgrade}
        currentUserBuildings={currentUserBuildings}
      />
    </article>
  );
};
