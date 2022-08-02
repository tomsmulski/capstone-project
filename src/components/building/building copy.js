import {buildingPrice} from '../../util/BuildingPrice';
import {buildingTime, timeBuilder} from '../../util/BuildingTime';

import Buildingcard from './buildingcard';
import {useSelector} from 'react-redux';

export const Building_bak = ({buildingsTypes, addBuildingLevel}) => {
  const currentResources = useSelector(state => state.currentResources);
  const currentBuildings = useSelector(state => state.currentBuildings);
  const currentBuildingInProgress = useSelector(state => state.currentBuildingInProgress);



  function onHandleClickUpgrade(e) {
    const buildingId = e.target.dataset.buildid;
    const buildingBuildTime = e.target.dataset.buildtime;

    addBuildingLevel(Number(buildingId), Number(buildingBuildTime));
  }

  return buildingsTypes.map(buildType => {
    const currentBuildType = currentBuildings.find(currentBuild => currentBuild.buildingId === buildType._id);
    
    let inProgressId = 0;
    let buttonTexts = 'Build';

    if (currentBuildingInProgress > 0) {
      inProgressId = currentBuildingInProgress.buildingId;
      buttonTexts = inProgressId === buildType._id ? 'in Progress' : buttonTexts;
    }

    buttonTexts = currentBuildType.level > 0 && buttonTexts !== 'in Progress' ? 'Upgrade' : buttonTexts;

    const nextLevel = currentBuildType.level + 1;
    const buildPriceMoney = buildingPrice(nextLevel, buildType._id, 'Money');
    const buildPriceIron = buildingPrice(nextLevel, buildType._id, 'Iron');
    const buildTime = buildingTime(buildPriceMoney, buildPriceIron);

    const buildInProgressButtonDisable = currentBuildingInProgress === null ? false : true;
    const buildInProgressTime =
      currentBuildingInProgress === null ? '' : timeBuilder(Math.round(currentBuildingInProgress.diffTime / 1000));

    const buildPriceTextColor = [];
    let notEnoughRescourceButtonDisable = false;

    buildType.buildMaterials.forEach(buildMaterial => {
      for (let index = 1; index <= 5; index++) {
        if (index === buildMaterial.id) {
          const currentRess = currentResources[index];

          const enoughRescource =
            currentRess >= buildingPrice(nextLevel, buildType.id, buildMaterial.name) ? true : false;
          const textColor = enoughRescource ? 'black' : 'red';
          if (!enoughRescource) {
            notEnoughRescourceButtonDisable = true;
          }
          buildPriceTextColor.push(textColor);
        }
      }
    });

    return (
      <div key={buildType.id}>
        <Buildingcard
          buildType={0}
          buildId={buildType.id}
          buildName={buildType.name}
          buildDescription={buildType.description}
          buildTime={buildTime}
          buildPrice={buildType.buildMaterials}
          buildPriceTextColor={buildPriceTextColor}
          buildYield={buildType.productionMaterials}
          buildInProgressTime={buildInProgressTime}
          currentBuildLevel={currentBuildType.level}
          buttonText={buttonTexts}
          buttonDisabled={buildInProgressButtonDisable || notEnoughRescourceButtonDisable}
          buttonFunction={onHandleClickUpgrade}
        />
      </div>
    );
  });
};
