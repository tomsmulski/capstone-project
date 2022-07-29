import {buildingPrice} from '../../util/BuildingPrice';
import {buildingTime, timeBuilder} from '../../util/BuildingTime';

import Buildingcard from './buildingcard';

export const Building = ({
  buildingsTypes,
  currentBuildings,
  addBuildingLevel,
  currentBuildingBuild,
  currentResources,
}) => {
  function onHandleClickUpgrade(e) {
    const buildingId = e.target.dataset.buildid;
    const buildingBuildTime = e.target.dataset.buildtime;

    addBuildingLevel(Number(buildingId), Number(buildingBuildTime));
  }

  return buildingsTypes.map(buildType => {
    const currentBuildType = currentBuildings.find(currentBuild => currentBuild.buildingId === buildType.id);

    let inProgressId = 0;
    let buttonTexts = 'Build';

    if (currentBuildingBuild !== null) {
      inProgressId = currentBuildingBuild.id;
      buttonTexts = inProgressId === buildType.id ? 'in Progress' : buttonTexts;
    }
    buttonTexts = currentBuildType.level > 0 && buttonTexts !== 'in Progress' ? 'Upgrade' : buttonTexts;

    const nextLevel = currentBuildType.level + 1;
    const buildPriceMoney = buildingPrice(nextLevel, buildType.id, 'Money');
    const buildPriceIron = buildingPrice(nextLevel, buildType.id, 'Iron');
    const buildTime = buildingTime(buildPriceMoney, buildPriceIron);

    const buildInProgressButtonDisable = currentBuildingBuild === null ? false : true;
    const buildInProgressTime =
      currentBuildingBuild === null ? '' : timeBuilder(Math.round(currentBuildingBuild.diffTime / 1000));

    const buildPriceTextColor = [];
    let notEnoughRescourceButtonDisable = false;
    buildType.buildMaterials.forEach(buildMaterial => {
      const currentRess = currentResources.find(currentRess => currentRess.id === buildMaterial.id);
      const enoughRescource =
        currentRess.value >= buildingPrice(nextLevel, buildType.id, buildMaterial.name) ? true : false;
      const textColor = enoughRescource ? 'black' : 'red';
      if (!enoughRescource) {
        notEnoughRescourceButtonDisable = true;
      }
      buildPriceTextColor.push(textColor);
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
