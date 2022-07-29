import styled from 'styled-components';
import {Resource} from '../resources/Resource';
import {buildingPrice} from '../../util/BuildingPrice';
import {buildingTime, timeBuilder} from '../../util/BuildingTime';
import {productionResources} from '../../util/ResourcenProduction';
import Button from './../button/button';


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
      <StyledBuildingSection key={buildType.id}>
        <StyledBuildingArticle>
          <StyledBuildingH1>
            {buildType.name} ({currentBuildType.level})
          </StyledBuildingH1>
          <StyledBuildingParagraph>{buildType.description}</StyledBuildingParagraph>
        </StyledBuildingArticle>
        <StyledBuildingArticle>
          <StyledBuildingSpan>
            <StyledBuildingBuildTime>{buildTime.buildTimeDisplay}</StyledBuildingBuildTime>
            <StyledBuildingSpanUpgradeText>To upgrade to level {nextLevel} you need</StyledBuildingSpanUpgradeText>
          </StyledBuildingSpan>

          <StyledBuildingDiv>
            <StyledBuildingDiv2>
              {buildType.productionMaterials.map(productionMaterial => {
                return (
                  <Resource
                    key={productionMaterial.id}
                    iconSize="small"
                    displayValuePosition="right"
                    currentRess={{
                      name: productionMaterial.name,
                      value: productionResources(
                        productionMaterial.name,
                        nextLevel,
                        buildType.id === 4 ? 'add' : 'remove',
                        true,
                        'difference'
                      ),
                    }}
                  />
                );
              })}
            </StyledBuildingDiv2>

            <StyledBuildingSpanRes>
              {buildType.buildMaterials.map((buildMaterial, key) => {
                return (
                  <Resource
                    key={buildMaterial.id}
                    iconSize="small"
                    color={buildPriceTextColor[key]}
                    currentRess={{
                      name: buildMaterial.name,
                      value: buildingPrice(nextLevel, buildType.id, buildMaterial.name),
                    }}
                  />
                );
              })}
            </StyledBuildingSpanRes>
          </StyledBuildingDiv>

          <StyledBuildingButtonDiv>
            <StyledBuildingProgressTime>{buildInProgressTime}</StyledBuildingProgressTime>
            <Button
              disabled={buildInProgressButtonDisable || notEnoughRescourceButtonDisable}
              buildId={buildType.id}
              buildTime={buildTime.buildTimeSeconds}
              onHandleClick={onHandleClickUpgrade}
              buttonText={buttonTexts}
            >
              {buttonTexts}
            </Button>
          </StyledBuildingButtonDiv>
        </StyledBuildingArticle>
      </StyledBuildingSection>
    );
  });
};

const StyledBuildingSection = styled.section`
  margin-top: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledBuildingArticle = styled.article`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StyledBuildingH1 = styled.h1`
  border: 1px solid black;
  font-size: x-large;
  padding: 5px;
`;

const StyledBuildingParagraph = styled.p`
  max-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  padding: 5px;
`;

const StyledBuildingSpan = styled.span`
  display: flex;
  justify-content: space-between;
`;

const StyledBuildingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledBuildingDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBuildingSpanRes = styled.span`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 5px;
  margin-right: 10px;
`;

const StyledBuildingBuildTime = styled.p`
  width: 100px;
  padding: 5px;
  font-size: large;
`;

const StyledBuildingSpanUpgradeText = styled.span`
  float: right;
  text-align: right;
  padding: 5px;
  width: 100%;
`;

const StyledBuildingButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const StyledBuildingButton = styled.button`
  margin-top: 10px;
  width: 120px;
  height: 30px;
  font-size: larger;
`;

const StyledBuildingProgressTime = styled.span`
  text-align: right;
  margin-top: 14px;
  margin-right: 5px;
  width: 120px;
  height: 30px;
  font-size: larger;
`;
