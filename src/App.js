import {useState, useEffect} from 'react';
import {ResourcesOverview} from './components/resources/ResourcesOverview';
import {Building} from './components/buildings/building';
import {gameConfig} from './util/GameConfig';
import {productionResources} from './util/ResourcenProduction';
import {buildingPrice} from './util/BuildingPrice';

const userResources = [
  {id: 1, name: 'Money', value: gameConfig.resourcesTypes.money.startResources},
  {id: 2, name: 'Iron', value: gameConfig.resourcesTypes.iron.startResources},
  {id: 3, name: 'Fuel', value: gameConfig.resourcesTypes.fuel.startResources},
  {id: 4, name: 'Gold', value: gameConfig.resourcesTypes.gold.startResources},
  {id: 5, name: 'Energy', value: gameConfig.resourcesTypes.energy.startResources},
];

const buildingsTypes = [
  {
    id: 1,
    name: 'Money Factory',
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    productionMaterials: [
      {id: 1, name: 'Money'},
      {id: 5, name: 'Energy'},
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
  {
    id: 2,
    name: 'Iron Foundry',
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    productionMaterials: [
      {id: 2, name: 'Iron'},
      {id: 5, name: 'Energy'},
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
  {
    id: 3,
    name: 'Oil Refinery',
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    productionMaterials: [
      {id: 3, name: 'Fuel'},
      {id: 5, name: 'Energy'},
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
  {
    id: 4,
    name: 'Windpower Plant',
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    productionMaterials: [{id: 5, name: 'Energy'}],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
];

const userBuildings = [
  {buildingId: 1, level: 0},
  {buildingId: 2, level: 0},
  {buildingId: 3, level: 0},
  {buildingId: 4, level: 0},
];

export default function App() {
  const [currentBuildingBuild, setCurrentBuildingBuild] = useState(null);
  const [currentResources, setCurrentResources] = useState(userResources);
  const [currentBuildings, setCurrentBuildings] = useState(userBuildings);

  function addBuildingLevel(buildingId, buildingBuildTime) {
    if (currentBuildingBuild === null) {
      const currentBuilding = currentBuildings.find(currentBuilding => currentBuilding.buildingId === buildingId);
      const nextBuildingLevel = currentBuilding.level + 1;
      const progressBuildingTime = buildingBuildTime * 1000;

      const startBuildingTime = Date.now();
      const endBuildingTime = startBuildingTime + progressBuildingTime;

      setCurrentBuildingBuild({
        id: buildingId,
        startTime: startBuildingTime,
        endTime: endBuildingTime,
        diffTime: progressBuildingTime,
        toLevel: nextBuildingLevel,
      });

      const buildingType = buildingsTypes.find(buildingType => buildingType.id === buildingId);

      buildingType.buildMaterials.forEach(material => {
        setCurrentResources(currentRess =>
          currentRess.map(objRess => {
            if (objRess.id === material.id) {
              return {
                ...objRess,
                value: objRess.value - buildingPrice(nextBuildingLevel, buildingType.id, material.name),
              };
            }
            return objRess;
          })
        );
      });
    }
  }

  useEffect(() => {
    if (currentBuildingBuild !== null) {
      const interval = setInterval(
        () =>
          setCurrentBuildingBuild(current => {
            const timeNow = Date.now();
            const endBuildTime = current.endTime;

            const buildingDiffTime = endBuildTime - timeNow;

            if (buildingDiffTime < 0) {
              setCurrentBuildings(currentBuilding =>
                currentBuilding.map(objBuilding => {
                  if (objBuilding.buildingId === current.id) {
                    if (current.toLevel !== objBuilding.level) {
                      const updateToLevel = objBuilding.level + 1;

                      setCurrentResources(current =>
                        current.map(obj => {
                          if (obj.id === 5) {
                            return {...obj, value: objBuilding.buildingId === 4 ? productionResources(obj.name, updateToLevel) : -productionResources(obj.name, updateToLevel)};
                          }
                          return obj;
                        })
                      );

                      return {...objBuilding, level: updateToLevel};
                    }
                  }
                  return objBuilding;
                })
              );
            } else {
              return {...current, diffTime: buildingDiffTime};
            }

            return null;
          }),
        1000
      );

      return () => {
        clearInterval(interval);
      };
    }
  }, [currentBuildingBuild]);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentResources(current =>
          current.map(obj => {
            if (obj.id < 4) {
              const currentBuildingLevel = currentBuildings.find(currBuild => currBuild.buildingId === obj.id);
              return {...obj, value: obj.value + productionResources(obj.name, currentBuildingLevel.level)};
            }
            return obj;
          })
        ),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [currentResources, currentBuildings]);

  return (
    <>
      <ResourcesOverview currentResources={currentResources} />
      <Building
        buildingsTypes={buildingsTypes}
        currentBuildings={currentBuildings}
        addBuildingLevel={addBuildingLevel}
        currentBuildingBuild={currentBuildingBuild}
      />
    </>
  );
}
