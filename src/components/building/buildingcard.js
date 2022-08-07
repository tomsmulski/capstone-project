import styled from 'styled-components';
import Button from '../button/button';
import {Resource} from '../resources/Resource';
import {displayLevelUpResourcesProduction} from '../../util/ResourcenProduction';
import {buildingPrice} from '../../util/BuildingPrice';
import BuildingManuel from '../manuel/buildingmanuel';

import {bindActionCreators} from 'redux';
import { useDispatch} from 'react-redux';
import { actionCreators } from '../../state';

export default function Buildingcard({
  buildType,
  buildId,
  buildName,
  buildDescription,
  buildTime,
  buildPrice,
  buildPriceTextColor,
  buildYield,
  currentBuildLevel,
  buttonText,
  buttonDisabled,
  buttonFunction,
  currentUserBuildings,
}) {
  const {setOpenManuel} = bindActionCreators(actionCreators, useDispatch());
  return (
    <>
      <StyledSection>
        <StyledHeader>
          <StyledDivHeader>
            <StyledTitle>
              {buildName} ({currentBuildLevel})
            </StyledTitle>
            <StyledManuelButton onClick={() => setOpenManuel(true)}>📖</StyledManuelButton>
          </StyledDivHeader>
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
      <BuildingManuel buildId={buildId} currentUserBuildings={currentUserBuildings} setOpenManuel={setOpenManuel}></BuildingManuel>
    </>
  );
}

const StyledSection = styled.section`
  margin-top: 60px;
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
  display: flex;
  font-size: xx-large;
  margin: 0;
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
  min-height: 158px;
  margin: 0;
`;

const StyledSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 0;
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

const StyledManuelButton = styled.span`
  font-size: 25px;
  margin: 0;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 68px;
  width: 100%;
`;

const StyledDivHeader = styled.div`
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
`;

const StyledBuildYieldInfo = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
`;

const StyledBuildPriceInfo = styled.span`
  width: 30%;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  margin: 0;
`;

const StyledButtonContainer = styled.div`
  margin: 0;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: end;
  position: relative;
`;
