import styled from 'styled-components';
import Table from './table';

import { useSelector} from 'react-redux';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';

export default function Modul({buildId, currentBuildLevel, setOpenManuel}) {
  const gameBuildingsType = gameBuildingsTypes.find(gameBuildingsType => gameBuildingsType.id === buildId);

  const openManuelStatus = useSelector(state => state.openManuel.status);

  
  return (
    <>
      <StyledSection openManuelStatus={openManuelStatus}>
        <StyledDiv>
          <StyledArticleTitle>
            <StyledH1>Building Manuel</StyledH1>
            <StyledCloseButton onClick={()=>setOpenManuel(false)}>X</StyledCloseButton>
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
            <Table buildId={buildId} currentBuildLevel={currentBuildLevel}/>
          </StyledArticleNextLevel>
        </StyledDiv>
      </StyledSection>
    </>
  );
}

const StyledSection = styled.section`
  position: fixed;
  display: ${props => props.openManuelStatus ? 'block' : 'none'};
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
  border: 1px solid yellow;
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
  border: 1px solid yellow;
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
  min-height: 96px;
  max-height: 96px;
`;

const StyledH3 = styled.h3`
  border: 1px solid black;
  width: 120px;
  float: right;
`;

const StyledArticleDescription = styled.article`
  border: 1px solid yellow;
  position: relative;
  height: 200px;
  padding: 10px;
  margin: 0;
`;

const StyledP = styled.p`
  border: 1px solid green;
  padding: 5px;
`;

const StyledArticleNextLevel = styled.article`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
