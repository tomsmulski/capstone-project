import styled from 'styled-components';
import {Resource} from '../resources/Resource';

export const Building = ({buildings}) => {
  return buildings.map((building) => {
  return <StyledBuildingSection key={building.id}>
        <StyledBuildingArticle>
          <StyledBuildingH1>Building Name (0)</StyledBuildingH1>
          <StyledBuildingParagraph>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut l
          </StyledBuildingParagraph>
        </StyledBuildingArticle>
        <StyledBuildingArticle>
          <StyledBuildingSpan>
            <StyledBuildingBuildTime>1m 30s</StyledBuildingBuildTime>
            <StyledBuildingSpanUpgradeText>To upgrade to level 1 you need</StyledBuildingSpanUpgradeText>
          </StyledBuildingSpan>

          <StyledBuildingDiv>
            <Resource displayValuePosition="right" iconSize="small" currentRes={{id: 2, name: 'Energy', value: 22}} />
            <StyledBuildingSpanRes>
              <Resource iconSize="small" currentRes={{id: 1, name: 'Money', value: 75}} />
              <Resource iconSize="small" currentRes={{id: 2, name: 'Iron', value: 30}} />
            </StyledBuildingSpanRes>
          </StyledBuildingDiv>

          <StyledBuildingButtonDiv>
            <StyledBuildingButton>Build</StyledBuildingButton>
          </StyledBuildingButtonDiv>
        </StyledBuildingArticle>
      </StyledBuildingSection>
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
