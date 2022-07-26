import {useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/building/Building';
import {BuildingNavigation} from './components/building/BuildingNavigation';
import {productionResources} from './util/ResourcenProduction';
import {getUserCitys} from './services/usercitys';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actionCreators} from './state/index';
import Loading from './components/loading/Loading';
import styled from 'styled-components';
import Header from './components/header/Header';
import SideNavigation from './components/navigation/SideNavigation';
import ManualModul from './components/manual/ManualModul';

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
  const sideNavigation = useSelector(state => state.sideNavigation);

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
  }, [
    currentUserResources,
    loadingStatus,
    addResources,
    setResources,
    currentUserBuildings,
    currentUserBuildingInProgress,
  ]);

  useEffect(() => {
    if (currentUserBuildingInProgress.length > 0) {
      const timeNow = Date.now();
      const endBuildTime = currentUserBuildingInProgress[0].endTime;

      const buildingDiffTime = endBuildTime - timeNow;

      if (buildingDiffTime < -1000) {
        addBuildings(currentUserBuildingInProgress[0].buildingId);
        setResources('energy', productionResources('energy', currentUserBuildings));
        removeBuildingToBuild(currentUserBuildingInProgress[0].cityId, currentUserBuildingInProgress[0].buildingId);
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
      <>
        <Header />
        <StyledMain>
          <ResourcesOverview />
          <Building selectedBuilding={selectedBuilding} />
          <BuildingNavigation currentUserBuildings={currentUserBuildings} selectedBuilding={selectedBuilding} />
        </StyledMain>
        <SideNavigation sideNavigation={sideNavigation} />
        <ManualModul />
      </>
    );
  } else {
    return <Loading />;
  }
}

const StyledMain = styled.main`
  height: 100%;
`;
