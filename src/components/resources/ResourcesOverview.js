import styled from 'styled-components';
import {Resource} from './Resource';

export const ResourcesOverview = ({currentResources}) => {
  return (
    <StyledResourcesContainer>
      {currentResources.map(currentRess => (
        <Resource key={currentRess.id} displayValue={true} currentRess={currentRess}></Resource>
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
