import styled from 'styled-components';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';
import {displayLevelUpResourcesProduction} from '../../util/ResourcenProduction';

export default function BuildingManualNextLevelTable({buildId, currentBuildLevel}) {
  const gameBuildingsType = gameBuildingsTypes.find(gameBuildingsType => gameBuildingsType.id === buildId);

  const nextLevelObject = [];

  for (let index = currentBuildLevel; index <= currentBuildLevel + 5; index++) {
    const hourProduction = displayLevelUpResourcesProduction(
      gameBuildingsType.productionMaterials[0].resourceType,
      index,
      gameBuildingsType.id,
      0,
      true
    );
    const hourProductionDiff = displayLevelUpResourcesProduction(
      gameBuildingsType.productionMaterials[0].resourceType,
      index,
      gameBuildingsType.id
    );

    nextLevelObject.push({level: index, production: hourProduction, difference: hourProductionDiff});
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
