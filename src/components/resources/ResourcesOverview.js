import styled from 'styled-components';
import {Resource} from './Resource';
import {nanoid} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export const ResourcesOverview = () => {
  const currentUserResources = useSelector(state => state.currentUserResources);

  let currentRess = [];

  Object.keys(currentUserResources).forEach(key => {
    currentRess.push({name: key, value: currentUserResources[key]});
  });

  return (
    <StyledResourcesContainer>
      {currentRess.map(ress => {
        return <Resource key={nanoid()} displayValue={true} currentRess={ress}></Resource>;
      })}
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
