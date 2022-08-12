import styled from 'styled-components';
import Button from '../button/Button';
import {Resource} from '../resources/Resource';
import {displayLevelUpResourcesProduction} from '../../util/ResourcenProduction';
import {buildingPrice} from '../../util/BuildingPrice';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {actionCreators} from '../../state';

export default function BuildingCard({
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
  onActionButtonClick,
  currentUserBuildings,
}) {
  const {setOpenManual} = bindActionCreators(actionCreators, useDispatch());
  return (
    <>
      <StyledSection>
        <StyledWrapper>
          <StyledHeadSpan>
            <StyledTitle>
              {buildName} ({currentBuildLevel})
            </StyledTitle>
            <StyledManualButton onClick={() => setOpenManual(true, 'Building', buildId)}>
              <Icon icon="bi:book-fill" />
            </StyledManualButton>
          </StyledHeadSpan>
          <StyledDescription>{buildDescription}</StyledDescription>
        </StyledWrapper>
        <StyledHr />
        <StyledBuildInfoContainer>
          <StyledSpan>
            <StyledBuildTimeInfo>
              <Icon icon="entypo:clock" /> {buildTime.buildTimeDisplay}
            </StyledBuildTimeInfo>
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
                    currentResources={{
                      name: productionMaterial.resourceType,
                      value: displayLevelUpResourcesProduction(
                        productionMaterial.resourceType,
                        currentBuildLevel,
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
                    currentResources={{
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
              onHandleClick={onActionButtonClick}
              buttonText={buttonText}
            />
          </StyledButtonContainer>
        </StyledBuildInfoContainer>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  margin-top: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  height: 290px;
  background: var(--background-front);
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const StyledTitle = styled.h1`
  display: flex;
  font-size: 22px;
  margin: 0;
  color: orange;
  padding-top: 10px;
  padding-left: 10px;
`;

const StyledDescription = styled.p`
  min-height: 40px;
  max-height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 10px;
  padding-top: 6px;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix  */
  -webkit-line-clamp: 2; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  font-size: 14px;
`;

const StyledBuildInfoContainer = styled.article`
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

const StyledManualButton = styled.button`
  font-size: 26px;
  margin: 0;
  background: transparent;
  border: 1px solid black;
  cursor: pointer;
  padding: 6px 6px 0 6px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 68px;
  width: 100%;
`;

const StyledHeadSpan = styled.span`
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
  margin-top: 40px;
`;

const StyledHr = styled.hr`
  border: 0.5px solid white;
  margin: 0 auto;
  width: 90%;
`;
