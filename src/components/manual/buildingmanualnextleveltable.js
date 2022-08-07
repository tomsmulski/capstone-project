import styled from 'styled-components';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import {displayLevelUpResourcesProduction} from '../../util/ResourcenProduction';

export default function BuildingManualNextLevelTable({buildId, currentUserBuildings}) {
  const gameBuildingsType = gameBuildingsTypes.find(gameBuildingsType => gameBuildingsType.id === buildId);

  const currentUserBuilding = currentUserBuildings.find(
    currentUserBuilding => currentUserBuilding.buildingId === buildId
  );

  let startLevel = currentUserBuilding.level === 0 ? 1 : currentUserBuilding.level;

  const nextLevelObject = [];

  for (let index = startLevel; index < startLevel + 5; index++) {
    const hourProduction = displayLevelUpResourcesProduction(
      gameBuildingsType.productionMaterials[0].resourceType,
      currentUserBuildings,
      gameBuildingsType.id,
      index
    );
    const hourProductionDiff = displayLevelUpResourcesProduction(
      gameBuildingsType.productionMaterials[0].resourceType,
      currentUserBuildings,
      gameBuildingsType.id,
      index - 1
    );

    nextLevelObject.push({level: index, production: hourProduction, difference: hourProduction - hourProductionDiff});
  }

  return (
    <StyledTable>
      <thead>
        <StyledTableRow>
          <td>Level</td>
          <td>Production</td>
          <td>Difference</td>
        </StyledTableRow>
      </thead>
      <tbody>
        {nextLevelObject.map(nextLevel => {
          return (
            <StyledTableRow key={nextLevel.level}>
              <td>{nextLevel.level}</td>
              <td>{nextLevel.production}</td>
              <td>{nextLevel.difference}</td>
            </StyledTableRow>
          );
        })}
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid black;
`;

const StyledTableRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;
