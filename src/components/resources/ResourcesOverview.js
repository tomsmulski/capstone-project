import styled from 'styled-components';
import {Resource} from './Resource';
import {nanoid} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from '../../state';
import ResourcesView from '../tooltip/ResourcesView';
import {useEffect} from 'react';

export const ResourcesOverview = () => {
  const currentUserResources = useSelector(state => state.currentUserResources);
  const {setTooltipResources, clearTooltipResources} = bindActionCreators(actionCreators, useDispatch());
  const tooltipResourcesView = useSelector(state => state.tooltipResourcesView);

  useEffect(() => {
    for (const key in tooltipResourcesView.status) {
      if (tooltipResourcesView.status[key]) {
        window.addEventListener('click', handleClick, false);

        return () => {
          window.removeEventListener('click', handleClick, false);
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipResourcesView]);

  function handleClick(event) {
    event.stopPropagation();

    for (const key in tooltipResourcesView.status) {
      if (tooltipResourcesView.status[key] && tooltipResourcesView.click === key) {
        setTooltipResources(tooltipResourcesView.status[key], key, tooltipResourcesView.currentResources.value);
        break;
      } else {
        clearTooltipResources(false);
      }
    }
  }

  const handleClickOpenResourcenView = currentResource => {
    setTooltipResources(
      !tooltipResourcesView.status[currentResource.name],
      currentResource.name,
      currentResource,
      currentResource.name
    );
  };

  let currentResources = [];

  Object.keys(currentUserResources).forEach(key => {
    currentResources.push({id: nanoid(), name: key, value: currentUserResources[key]});
  });

  return (
    <StyledResourcesContainer>
      {currentResources.map(currentResource => {
        return (
          <StyledSection key={currentResource.id}>
            <div onClick={() => handleClickOpenResourcenView(currentResource)}>
              <Resource displayValue={true} currentResources={currentResource} color={'white'}></Resource>
            </div>
            <ResourcesView
              isOpen={tooltipResourcesView.status[currentResource.name]}
              currentResource={currentResource}
            ></ResourcesView>
          </StyledSection>
        );
      })}
    </StyledResourcesContainer>
  );
};

const StyledResourcesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background: var(--background-resources);
`;

const StyledSection = styled.section`
  cursor: pointer;
`;
