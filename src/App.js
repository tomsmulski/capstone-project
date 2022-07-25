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

const allBuildings = [
  {
    id: 4,
    name: 'Windpower Plant',
    type: 1,
    buildMaterials: [
      {id: 1, name: 'Money'},
      {id: 2, name: 'Iron'},
    ],
    description:
      'A Windpower plant converts the kinetic energy of the wind into electrical energy and feeds it into an electricity grid. Colloquially, the terms wind power plant or simply wind turbine are also used.',
  },
];

const userBuildings = [{id: 4, name: 'Windpower Plant', level: 0}];

export default function App() {
  const [currentBuildingBuild, setCurrentBuildingBuild] = useState(null);
  const [currentResources, setCurrentResources] = useState(userResources);
  const [currentBuildings, setCurrentBuildings] = useState(userBuildings);

  function addBuildingLevel(buildingId, buildingBuildTime) {
    let currentBuildLevel = 0;

    if (currentBuildingBuild === null) {
      currentBuildings.forEach(element => {
        if (element.id === Number(buildingId)) {
          currentBuildLevel = element.level + 1;
        }
      });

      const startBuildingTime = Date.now();
      const endBuildingTime = Number(startBuildingTime) + Number(buildingBuildTime * 1000);

      setCurrentBuildingBuild({
        id: buildingId,
        startTime: startBuildingTime,
        endTime: endBuildingTime,
        diffTime: Number(buildingBuildTime * 1000),
        toLevel: Number(currentBuildLevel),
      });

      allBuildings.map(building => {
        if (building.id === Number(buildingId)) {
          building.buildMaterials.map(material => {
            setCurrentResources(currentRess =>
              currentRess.map(objRess => {
                if (objRess.id === material.id) {
                  return {
                    ...objRess,
                    value: objRess.value - buildingPrice(currentBuildLevel, building.type, material.name),
                  };
                }

                //if (objRess.id === 5) {
                //  return {...objRess, value: productionResources(objRess.name, currentBuildLevel)};
                //}

                return objRess;
              })
            );
            return material;
          });
        }
        return building;
      });
    }
  }

  useEffect(() => {
    if (currentBuildingBuild !== null) {
      const interval = setInterval(
        () =>
          setCurrentBuildingBuild(current => {
            const timeNow = Date.now();
            const endBuildTime = Number(current.endTime);

            const buildingDiffTime = endBuildTime - timeNow;

            if (buildingDiffTime < 0) {
              setCurrentBuildings(currentBuilding =>
                currentBuilding.map(objBuilding => {
                  if (objBuilding.id === Number(current.id)) {
                    if (current.toLevel !== objBuilding.level) {
                      const updateToLevel = objBuilding.level + 1;

                      setCurrentResources(current =>
                        current.map(obj => {
                          if (obj.id === 5) {
                            return {...obj, value: productionResources(obj.name, updateToLevel)};
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
              return {...current, diffTime: Number(buildingDiffTime)};
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
            return {...obj, value: obj.value + productionResources(obj.name, 0)};
          })
        ),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [currentResources]);

  return (
    <>
      <ResourcesOverview currentResources={currentResources} />
      <Building
        allBuildings={allBuildings}
        currentBuildings={currentBuildings}
        addBuildingLevel={addBuildingLevel}
        currentBuildingBuild={currentBuildingBuild}
      />
    </>
  );
}
