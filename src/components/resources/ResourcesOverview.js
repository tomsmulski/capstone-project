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

  const handleClick = currentRess => {
    setTooltipResources(!tooltipResourcesView.status[currentRess.name], currentRess.name, currentRess);
  };

  let currentRess = [];

  Object.keys(currentUserResources).forEach(key => {
    currentRess.push({id: nanoid(), name: key, value: currentUserResources[key]});
  });

  return (
    <>
      <StyledResourcesContainer>
        {currentRess.map(ress => {
          return (
            <section key={ress.id}>
              <div onClick={() => handleClick(ress)}>
                <Resource displayValue={true} currentRess={ress}></Resource>
              </div>
              <ResourcesView isOpen={tooltipResourcesView.status[ress.name]} currentRess={ress}></ResourcesView>
            </section>
          );
        })}
      </StyledResourcesContainer>
    </>
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
