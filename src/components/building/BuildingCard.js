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
              <Icon icon="bi:book" />
            </StyledManualButton>
          </StyledHeadSpan>
          <StyledDescription>{buildDescription.short}</StyledDescription>
        </StyledWrapper>
        <StyledHr />
        <StyledBuildInfoContainer>
          <StyledSpan>
            <StyledBuildTimeInfo>
              <Icon icon="entypo:clock" /> <StyledBuildTimeDisplay>{buildTime.buildTimeDisplay}</StyledBuildTimeDisplay>
            </StyledBuildTimeInfo>
            <StyledBuildNextLevelText>To upgrade to level {currentBuildLevel + 1} you need</StyledBuildNextLevelText>
          </StyledSpan>

          <StyledDiv>
            <StyledBuildYieldInfo>
              {buildYield.map(productionMaterial => {
                if (productionMaterial.resourceType === 'energy') {
                  return (
                    <Resource
                      key={productionMaterial.id}
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
                }
              })}
            </StyledBuildYieldInfo>

            <StyledBuildPriceInfo>
              {buildPrice.map((buildMaterial, index) => {
                return (
                  <Resource
                    key={buildMaterial.id}
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
          <StyledHr />
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
  height: 300px;
  background: var(--background-card);
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTitle = styled.h1`
  display: flex;
  font-size: 22px;
  font-family: var(--font-family-primary);
  margin: 6px 0 0 0;
  color: var(--color-buildingname);
  padding: 10px 15px 0 15px;
`;

const StyledDescription = styled.p`
  min-height: 60px;
  max-height: 60px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-family: var(--font-family-third);
  padding: 10px 15px;
  display: -webkit-box; /* stylelint-disable-line value-no-vendor-prefix  */
  -webkit-line-clamp: 2; /* stylelint-disable-line property-no-vendor-prefix */
  -webkit-box-orient: vertical; /* stylelint-disable-line property-no-vendor-prefix */
  font-size: 16px;
  width: 100%;
  color: var(--color-primary);
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
  padding: 10px 15px 0 15px;
  font-size: 16px;
  font-family: var(--font-family-third);
`;

const StyledBuildNextLevelText = styled.span`
  float: right;
  text-align: right;
  padding: 8px 15px 0 0;
  width: 100%;
  font-size: 16px;
  font-family: var(--font-family-third);
  color: var(--color-primary);
`;

const StyledManualButton = styled.button`
  font-size: 22px;
  border: 0.5px solid #ec9044;
  border-radius: 5px;
  background: #121212;
  margin: 6px;
  color: #ec9044;
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
  background: var(--background-front-title);
`;

const StyledBuildYieldInfo = styled.span`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 5px;
`;

const StyledBuildPriceInfo = styled.span`
  width: 198px;
  display: flex;
  justify-content: end;
  position: relative;
  margin: 0 10px 0 0;
`;

const StyledButtonContainer = styled.div`
  margin: 35px 0 0 0;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: end;
  position: relative;
`;

const StyledHr = styled.hr`
  border-bottom: 0.5px solid var(--color-primary);
  margin: 0 auto;
  width: 90%;
`;

const StyledBuildTimeDisplay = styled.span`
  padding-left: 5px;
`;
