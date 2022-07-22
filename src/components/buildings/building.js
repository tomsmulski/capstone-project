import styled from 'styled-components';
import {Resource} from '../resources/Resource';
import {buildingPrice} from '../../util/BuildingPrice';

export const Building = ({allBuildings, productionEnergy, currentBuildingData}) => {
  return allBuildings.map(building =>
    currentBuildingData.map(currentBuilding => {
      if (building.id === currentBuilding.id) {
        const nextLevel = currentBuilding.currentLevel + 1;
        return (
          <StyledBuildingSection key={building.id}>
            <StyledBuildingArticle>
              <StyledBuildingH1>
                {building.name} ({building.currentLevel})
              </StyledBuildingH1>
              <StyledBuildingParagraph>{building.description}</StyledBuildingParagraph>
            </StyledBuildingArticle>
            <StyledBuildingArticle>
              <StyledBuildingSpan>
                <StyledBuildingBuildTime>1m 30s</StyledBuildingBuildTime>
                <StyledBuildingSpanUpgradeText>To upgrade to level {nextLevel} you need</StyledBuildingSpanUpgradeText>
              </StyledBuildingSpan>

              <StyledBuildingDiv>
                <Resource
                  displayValuePosition="right"
                  iconSize="small"
                  currentRes={{name: 'Energy', value: productionEnergy(nextLevel)}}
                />
                <StyledBuildingSpanRes>
                  {building.buildMaterials.map(buildMaterial => {
                    return (
                      <Resource
                        key={buildMaterial.id}
                        iconSize="small"
                        currentRes={{
                          name: buildMaterial.name,
                          value: buildingPrice(nextLevel, building.type, buildMaterial.name),
                        }}
                      />
                    );
                  })}
                </StyledBuildingSpanRes>
              </StyledBuildingDiv>

              <StyledBuildingButtonDiv>
                <StyledBuildingButton>{currentBuilding.currentLevel > 0 ? 'Upgrade' : 'Build'}</StyledBuildingButton>
              </StyledBuildingButtonDiv>
            </StyledBuildingArticle>
          </StyledBuildingSection>
        );
      }
    })
  );
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

const StyledBuildingSpanRes = styled.span`
  display: flex;
  justify-content: right;
  position: relative;
  top: 5px;
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
