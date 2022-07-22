import styled from 'styled-components';
import {Resource} from './Resource';

export const ResourcesOverview = ({currentResource}) => {
  return (
    <StyledResourcesContainer>
      {currentResource.map(currentRes => (
        <Resource key={currentRes.id} currentRes={currentRes}></Resource>
      ))}
    </StyledResourcesContainer>
  );
};

const StyledResourcesContainer = styled.div`
  margin-top: 80px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
