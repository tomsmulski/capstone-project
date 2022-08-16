import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import BuildingManualNextLevelTable from './BuildingManualNextLevelTable';
import Images from '../../images';
import {Icon} from '@iconify/react';
import {bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {actionCreators} from '../../state';

export default function ManualModul() {
  const openManualStatus = useSelector(state => state.openManual);
  const currentUserBuildings = useSelector(state => state.currentUserBuildings);
  const {setOpenManual} = bindActionCreators(actionCreators, useDispatch());
  let currentBuilding, gameBuildingsType;

  if (openManualStatus.status) {
    let titleName = '';
    let globalManual = false;
    let buildingsManual = false;
    let buildingManual = false;

    if (openManualStatus.category === 'All') {
      titleName = 'Global Manual';
      globalManual = true;
    }

    if (openManualStatus.category === 'Buildings') {
      titleName = 'Buildings Manual';
      buildingsManual = true;
    }

    if (openManualStatus.category === 'Building') {
      titleName = 'Building Manual';
      buildingManual = true;

      currentBuilding = currentUserBuildings.find(
        currentBuilding => currentBuilding.buildingId === openManualStatus.buildId
      );

      gameBuildingsType = gameBuildingsTypes.find(
        gameBuildingsType => gameBuildingsType.id === openManualStatus.buildId
      );
    }

    return (
      <StyledSection openManualStatus={openManualStatus.status} imageBackground={Images.background.imageBackgroundMain}>
        <StyledArticleTitle>
          {openManualStatus.backTo !== '' ? (
            <StyledBackButton
              aria-label={'Back To ' + openManualStatus.backTo}
              onClick={() => {
                setOpenManual(
                  true,
                  openManualStatus.backTo,
                  '',
                  openManualStatus.category === 'All' ? '' : openManualStatus.category === 'Buildings' ? '' : 'All'
                );
              }}
            >
              <Icon icon="ant-design:arrow-left-outlined" fontSize={'26px'} />
            </StyledBackButton>
          ) : (
            ''
          )}
          <StyledH1>{titleName}</StyledH1>
          <StyledCloseButton aria-label={'Close Manual'} onClick={() => setOpenManual(false)}>
            <Icon icon="bi:x" fontSize={'26px'} />
          </StyledCloseButton>
        </StyledArticleTitle>

        {globalManual ? (
          <StyledArticleGlobal>
            <StyledArticleGlobalSpan>
              <Icon icon="codicon:triangle-right" color="#478106" />
              <StyledButtonGlobal onClick={() => setOpenManual(true, 'Buildings', '', 'All')}>
                Buildings
              </StyledButtonGlobal>
            </StyledArticleGlobalSpan>
          </StyledArticleGlobal>
        ) : (
          ''
        )}

        {buildingsManual ? (
          <StyledArticle>
            {gameBuildingsTypes.map(gameBuildingsType => {
              return (
                <StyledButton
                  key={gameBuildingsType.id}
                  onClick={() => setOpenManual(true, 'Building', gameBuildingsType.id, 'Buildings')}
                >
                  <StyledImgBuilding src={Images.image[gameBuildingsType.image]} alt={gameBuildingsType.name} />
                  <StyledBuildingName>{gameBuildingsType.name}</StyledBuildingName>
                </StyledButton>
              );
            })}
          </StyledArticle>
        ) : (
          ''
        )}

        {buildingManual ? (
          <StyledManualContainer>
            <StyledH2>{gameBuildingsType.name}</StyledH2>
            <StyledImg src={Images.image[gameBuildingsType.image]} alt={gameBuildingsType.name}></StyledImg>
            <StyledSectionDescription>
              <StyledH3>Description</StyledH3>
              <StyledHr />
              <StyledParagraph>{gameBuildingsType.description.long}</StyledParagraph>
            </StyledSectionDescription>
            <StyledDivNextLevel>
              <BuildingManualNextLevelTable
                buildId={openManualStatus.buildId}
                currentBuildLevel={currentBuilding.level}
              />
            </StyledDivNextLevel>
          </StyledManualContainer>
        ) : (
          ''
        )}
      </StyledSection>
    );
  }
}

const StyledSection = styled.section`
  position: fixed;
  display: ${props => (props.openManualStatus ? 'block' : 'none')};
  top: 0;
  height: 100%;
  z-index: 1;
  background: var(--background-front);
  width: 100%;
  overflow: hidden;
  overflow-y: scroll;

  @media screen and (min-width: 800px) {
    overflow-y: hidden;
  }
`;

const StyledArticleTitle = styled.article`
  position: relative;
  height: 70px;
  display: flex;
  align-items: center;
  text-align: center;
  background: var(--background-header);
  color: white;
`;

const StyledH1 = styled.h1`
  font-size: 26px;
  font-family: var(--font-family-primary);
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

const StyledBackButton = styled.button`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
`;

const StyledArticleGlobal = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledArticleGlobalSpan = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  padding: 10px;
  margin: 0;
  background: #0e0f14;
  border-bottom: 0.5px solid #2b3036;
`;

const StyledButtonGlobal = styled.button`
  color: #d0ced2;
  font-size: x-large;
  margin-left: 10px;
  padding: 5px;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
`;

const StyledArticle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 10px;
  margin: 0;
  width: 100%;
`;

const StyledImgBuilding = styled.img`
  position: absolute;
  width: 60px;
  height: 60px;
  border: 1px solid gold;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #d0ced2;
  font-size: 20px;
  margin-bottom: 5px;
  padding: 5px 0 5px 20px;
  width: 100%;
  height: 70px;
  background: var(--background-manual);
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledBuildingName = styled.span`
  position: absolute;
  margin-left: 80px;
`;

const StyledManualContainer = styled.div`
  width: 100%;
  padding: 10px 15px 0 15px;
`;

const StyledSectionDescription = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  max-height: 230px;
  margin: 0;
`;

const StyledParagraph = styled.p`
  font-family: var(--font-family-third);
  color: var(--color-primary);
  overflow: hidden;
  overflow-x: scroll;
`;

const StyledDivNextLevel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledH2 = styled.h2`
  font-size: 22px;
  margin: 14px 0;
  color: var(--color-buildingname);
  font-family: var(--font-family-primary);
`;

const StyledH3 = styled.h3`
  font-size: 16px;
  margin: 5px 0;
  font-family: var(--font-family-primary);
  color: var(--color-primary);
`;

const StyledImg = styled.img`
  width: 180px;
  height: 180px;
  border: 1px solid var(--color-buildingname);
  border-radius: 5px;
  margin-bottom: 20px;
`;

const StyledHr = styled.hr`
  border-bottom: 0.5px solid var(--color-primary);
  margin: 5px 0 10px 0;
`;
