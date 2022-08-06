import styled from 'styled-components';
import Button from '../button/button';
import {Resource} from '../resources/Resource';
import {displayLevelUpResourcesProduction} from '../../util/ResourcenProduction';
import {buildingPrice} from '../../util/BuildingPrice';

export default function Buildingcard({
  buildType,
  buildId,
  buildName,
  buildDescription,
  buildTime,
  buildPrice,
  buildPriceTextColor,
  buildYield,
  buildInProgressTime,
  currentBuildLevel,
  buttonText,
  buttonDisabled,
  buttonFunction,
  currentUserBuildings,
}) {
  return (
    <StyledSection>
      <StyledHeader>
        <StyledTitle>
          {buildName} ({currentBuildLevel})
        </StyledTitle>
        <StyledDescription>{buildDescription}</StyledDescription>
      </StyledHeader>
      <StyledBuildInfoContainer>
        <StyledSpan>
          <StyledBuildTimeInfo>🕜{buildTime.buildTimeDisplay}</StyledBuildTimeInfo>
          <StyledBuildNextLevelText>To upgrade to level {currentBuildLevel + 1} you need</StyledBuildNextLevelText>
        </StyledSpan>

        <StyledDiv>
          <StyledBuildYieldInfo>
            {buildYield.map(productionMaterial => {
              return (
                <Resource
                  key={productionMaterial.id}
                  iconSize="small"
                  displayValuePosition="right"
                  currentRess={{
                    name: productionMaterial.resourceType,
                    value: displayLevelUpResourcesProduction(
                      productionMaterial.resourceType,
                      currentUserBuildings,
                      buildId
                    ),
                  }}
                />
              );
            })}
          </StyledBuildYieldInfo>

          <StyledBuildPriceInfo>
            {buildPrice.map((buildMaterial, index) => {
              return (
                <Resource
                  key={buildMaterial.id}
                  iconSize="small"
                  color={buildPriceTextColor[index]}
                  currentRess={{
                    name: buildMaterial.resourceType,
                    value: buildingPrice(currentBuildLevel + 1, buildId, buildMaterial.resourceType),
                  }}
                />
              );
            })}
          </StyledBuildPriceInfo>
        </StyledDiv>

        <StyledButtonContainer>
          <StyledProgressTime>{buildInProgressTime}</StyledProgressTime>
          <Button
            disabled={buttonDisabled}
            buildId={buildId}
            buildTime={buildTime.buildTimeSeconds}
            onHandleClick={buttonFunction}
            buttonText={buttonText}
          />
        </StyledButtonContainer>
      </StyledBuildInfoContainer>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  margin-top: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.header`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StyledTitle = styled.h1`
  border: 1px solid black;
  font-size: x-large;
  padding: 5px;
`;

const StyledDescription = styled.p`
  min-height: 40px;
  max-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 5px;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix  */
  -webkit-line-clamp: 2; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
`;

const StyledBuildInfoContainer = styled.article`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 5px;
  min-height: 158px;
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
`;

const StyledBuildTimeInfo = styled.p`
  width: 200px;
  padding: 5px;
  font-size: large;
`;

const StyledBuildNextLevelText = styled.span`
  float: right;
  text-align: right;
  padding: 5px;
  width: 100%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 68px;
`;

const StyledBuildYieldInfo = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledBuildPriceInfo = styled.span`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  top: 5px;
  margin-right: 10px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const StyledProgressTime = styled.span`
  text-align: right;
  margin-top: 14px;
  margin-right: 5px;
  width: 120px;
  height: 30px;
  font-size: larger;
`;
