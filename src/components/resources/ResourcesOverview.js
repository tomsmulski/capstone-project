import styled from 'styled-components';
import {Resource} from './Resource';
import {nanoid} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import ResourcesView from '../tooltip/resourcesview';

export const ResourcesOverview = () => {
  const currentUserResources = useSelector(state => state.currentUserResources);
  const {setTooltipResources} = bindActionCreators(actionCreators, useDispatch());
  const tooltipResourcesView = useSelector(state => state.tooltipResourcesView);

  const handleClick = currentResource => {
    setTooltipResources(!tooltipResourcesView.status[currentResource.name], currentResource.name, currentResource);
  };

  let currentResources = [];

  Object.keys(currentUserResources).forEach(key => {
    currentResources.push({id: nanoid(), name: key, value: currentUserResources[key]});
  });

  return (
    <StyledResourcesContainer>
      {currentResources.map(currentResource => {
        return (
          <section key={currentResource.id}>
            <div onClick={() => handleClick(currentResource)}>
              <Resource displayValue={true} currentRess={currentResource}></Resource>
            </div>
            <ResourcesView
              isOpen={tooltipResourcesView.status[currentResource.name]}
              currentRess={currentResource}
            ></ResourcesView>
          </section>
        );
      })}
    </StyledResourcesContainer>
  );
};

const StyledResourcesContainer = styled.div`
  position: relative;
  margin-top: 80px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
