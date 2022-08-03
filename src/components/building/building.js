import {buildingPrice} from '../../util/BuildingPrice';
import {buildingTime, timeBuilder} from '../../util/BuildingTime';
import Buildingcard from './buildingcard';
import {bindActionCreators} from 'redux';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators} from '../../state';
import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';

export const Building = () => {
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

  return gameBuildingsTypes.map(gameBuildingType => {
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
    const buildInProgressTime =
      currentUserBuildingInProgress.length === 0
        ? ''
        : timeBuilder(Math.round(currentUserBuildingInProgress[0].diffTime / 1000));

    let buildPriceTextColor = [];
    let notEnoughRescourceButtonDisable = false;

    gameBuildingType.buildMaterials.forEach(buildMaterial => {
      for (const key in currentUserResources) {
        if (key === buildMaterial.resourceType) {
          
          const currentResource = currentUserResources[key];
          const neededResource = buildingPrice(nextLevel, gameBuildingType.id, key);
          const enoughRescource = currentResource >= neededResource;
          
          const textColor = enoughRescource ? 'black' : 'red';
          if (!enoughRescource) {
            notEnoughRescourceButtonDisable = true;
          }
          buildPriceTextColor.push(textColor);
        }
      }
    });

    return (
      <article key={gameBuildingType.id}>
        <Buildingcard
          buildType={0}
          buildId={gameBuildingType.id}
          buildName={gameBuildingType.name}
          buildDescription={gameBuildingType.description}
          buildTime={buildTime}
          buildPrice={gameBuildingType.buildMaterials}
          buildPriceTextColor={buildPriceTextColor}
          buildYield={gameBuildingType.productionMaterials}
          buildInProgressTime={buildInProgressTime}
          currentBuildLevel={currentUserBuilding.level}
          buttonText={buttonTexts}
          buttonDisabled={notEnoughRescourceButtonDisable || buildInProgressButtonDisable }
          buttonFunction={onHandleClickUpgrade}
        />
      </article>
    );
  });
};
