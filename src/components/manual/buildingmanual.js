import styled from 'styled-components';
import BuildingManualNextLevelTable from './buildingmanualnextleveltable';

import {useSelector} from 'react-redux';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';

export default function BuildingManual({buildId, currentUserBuildings, setOpenManual}) {
  const gameBuildingsType = gameBuildingsTypes.find(gameBuildingsType => gameBuildingsType.id === buildId);

  const openManualStatus = useSelector(state => state.openManual.status);

  return (
    <>
      <StyledSection openManualStatus={openManualStatus}>
        <StyledDiv>
          <StyledArticleTitle>
            <StyledH1>Building Manual</StyledH1>
            <StyledCloseButton onClick={() => setOpenManual(false)}>X</StyledCloseButton>
          </StyledArticleTitle>
          <StyledArticleInfomation>
            <StyledH2>{gameBuildingsType.name}</StyledH2>
            <StyledImg
              src={'../images/buildings/' + gameBuildingsType.image + '.png'}
              alt={gameBuildingsType.name}
            ></StyledImg>
            <StyledH3>Infomation</StyledH3>
          </StyledArticleInfomation>
          <StyledArticleDescription>
            <StyledH2>Description</StyledH2>
            <StyledP>{gameBuildingsType.description}</StyledP>
          </StyledArticleDescription>
          <StyledArticleNextLevel>
            <BuildingManualNextLevelTable buildId={buildId} currentUserBuildings={currentUserBuildings} />
          </StyledArticleNextLevel>
        </StyledDiv>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  position: fixed;
  display: ${props => (props.openManualStatus ? 'block' : 'none')};
  top: 0;
  background: gray;
  height: 100%;
  z-index: 99;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledArticleTitle = styled.article`
  border: 1px solid black;
  position: relative;
  height: 50px;
  text-align: center;
  margin: 0;
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
  background: black;
  color: white;
`;

const StyledArticleInfomation = styled.article`
  border: 1px solid black;
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
  border: 1px solid black;
  min-width: 134px;
  max-width: 134px;
  min-height: 134px;
  max-height: 134px;
`;

const StyledH3 = styled.h3`
  border: 1px solid black;
  width: 120px;
  float: right;
`;

const StyledArticleDescription = styled.article`
  border: 1px solid black;
  position: relative;
  height: 200px;
  padding: 10px;
  margin: 0;
`;

const StyledP = styled.p`
  border: 1px solid black;
  padding: 5px;
`;

const StyledArticleNextLevel = styled.article`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;