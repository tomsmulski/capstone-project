import {useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/building/building';
import {Buildingnav} from './components/building/buildingnav';
import {productionResources} from './util/ResourcenProduction';
import {getUserCitys} from './services/usercitys';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from './state/index';
import Loading from './components/loading/loading';
import styled from 'styled-components';

export default function App() {
  const {
    addResources,
    setResources,
    setBuildings,
    addBuildings,
    setLoading,
    updateBuildingToBuild,
    removeBuildingToBuild,
  } = bindActionCreators(actionCreators, useDispatch());

  const currentUserResources = useSelector(state => state.currentUserResources);
  const currentUserBuildings = useSelector(state => state.currentUserBuildings);
  const loadingStatus = useSelector(state => state.loadingStatus);
  const currentUserBuildingInProgress = useSelector(state => state.currentUserBuildingInProgress);
  const selectedBuilding = useSelector(state => state.selectedBuilding);

  useEffect(() => {
    loadingUserCitys();

    async function loadingUserCitys() {
      try {
        const userCitys = await getUserCitys();

        userCitys.forEach(userCity => {
          for (const key in userCity.currentResources[0]) {
            setResources(key, userCity.currentResources[0][key]);
          }

          userCity.currentBuildings.forEach(currentBuilding => {
            setBuildings(currentBuilding.buildingId, currentBuilding.level);
          });
        });

        setResources('energy', productionResources('energy', currentUserBuildings));

        setLoading('loadUserCitys', true);
      } catch (error) {
        console.log('loading Game datas Fail');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadingStatus.loadUserCitys) {
      setLoading('status', false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingStatus]);

  useEffect(() => {
    if (!loadingStatus.status) {
      const interval = setInterval(() => {
        currentUserBuildings.forEach(building => {
          if (building.resourcesType !== 'energy') {
            addResources(
              building.resourcesType,
              productionResources(building.resourcesType, currentUserBuildings, 0, 3600)
            );
          } else {
            setResources('energy', productionResources('energy', currentUserBuildings));
          }
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserResources, loadingStatus]);

  useEffect(() => {
    if (currentUserBuildingInProgress.length > 0) {
      const timeNow = Date.now();
      const endBuildTime = currentUserBuildingInProgress[0].endTime;

      const buildingDiffTime = endBuildTime - timeNow;

      if (buildingDiffTime < 0) {
        addBuildings(currentUserBuildingInProgress[0].buildingId);
        removeBuildingToBuild(currentUserBuildingInProgress[0].cityId, currentUserBuildingInProgress[0].buildingId);

        productionResources('energy', currentUserBuildings);
      } else {
        updateBuildingToBuild(
          currentUserBuildingInProgress[0].cityId,
          currentUserBuildingInProgress[0].buildingId,
          buildingDiffTime
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserResources]);

  if (!loadingStatus.status) {
    return (
      <StyledMain>
        <ResourcesOverview />
        <span>
          <Building selectedBuilding={selectedBuilding} />
          <Buildingnav currentUserBuildings={currentUserBuildings} selectedBuilding={selectedBuilding} />
        </span>
      </StyledMain>
    );
  } else {
    return <Loading></Loading>;
  }
}

const StyledMain = styled.main`
  background: gray;
`;
