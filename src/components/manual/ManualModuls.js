import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import BuildingManualNextLevelTable from './BuildingManualNextLevelTables';
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
            <StyledBackButton aria-label={'Back To ' + openManualStatus.backTo}
              onClick={() => {
                setOpenManual(
                  true,
                  openManualStatus.backTo,
                  '',
                  openManualStatus.category === 'All' ? '' : openManualStatus.category === 'Buildings' ? '' : 'All'
                );
              }}
            >
              <Icon icon="akar-icons:arrow-left-thick" fontSize={'34px'} />
            </StyledBackButton>
          ) : (
            ''
          )}
          <StyledH1>{titleName}</StyledH1>
          <StyledCloseButton aria-label={'Close Manual'} onClick={() => setOpenManual(false)}>X</StyledCloseButton>
        </StyledArticleTitle>

        {globalManual ? (
          <StyledArticle>
            <StyledButton onClick={() => setOpenManual(true, 'Buildings', '', 'All')}>Buildings</StyledButton>
          </StyledArticle>
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
                  {gameBuildingsType.name}
                </StyledButton>
              );
            })}
          </StyledArticle>
        ) : (
          ''
        )}

        {buildingManual ? (
          <>
            <StyledArticle>
              <StyledH2>{gameBuildingsType.name}</StyledH2>
              <StyledImg src={Images.image[gameBuildingsType.image]} alt={gameBuildingsType.name}></StyledImg>
            </StyledArticle>
            <StyledSectionDescription>
              <StyledH2>Description</StyledH2>
              <StyledParagraph>{gameBuildingsType.description}</StyledParagraph>
            </StyledSectionDescription>
            <StyledDivNextLevel>
              <BuildingManualNextLevelTable
                buildId={openManualStatus.buildId}
                currentBuildLevel={currentBuilding.level}
              />
            </StyledDivNextLevel>
          </>
        ) : (
          ''
        )}
      </StyledSection>
    );
  }
}

const StyledButton = styled.button`
  font-size: x-large;
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid black;
  border-radius: 5px;
`;

const StyledSection = styled.section`
  position: fixed;
  display: ${props => (props.openManualStatus ? 'block' : 'none')};
  top: 0;
  height: 100%;
  z-index: 1;
  background-image: url(${props => props.imageBackground});
  background-size: cover;
  background-attachment: fixed;
  width: 100%;
`;

const StyledArticleTitle = styled.article`
  position: relative;
  height: 50px;
  text-align: center;
`;

const StyledH1 = styled.h1`
  font-size: xx-large;
  margin-top: 5px;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  font-size: x-large;
  font-weight: bold;
`;

const StyledBackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
`;

const StyledArticle = styled.article`
  position: relative;
  height: 200px;
  padding: 10px;
  margin: 0;
`;

const StyledH2 = styled.h2`
  font-size: x-large;
  margin-top: 5px;
  padding: 5px;
`;

const StyledImg = styled.img`
  width: 134px;
  height: 134px;
`;

const StyledSectionDescription = styled.section`
  position: relative;
  height: 200px;
  padding: 10px;
  margin: 0;
`;

const StyledParagraph = styled.p`
  padding: 5px;
`;

const StyledDivNextLevel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
