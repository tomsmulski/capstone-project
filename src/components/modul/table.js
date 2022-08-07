import styled from 'styled-components';

import {gameBuildingsTypes} from '../../util/gamedatas/gameBuildingsTypes';

export default function Table({buildId}) {
  const gameBuildingsType = gameBuildingsTypes.find(gameBuildingsType => gameBuildingsType.id === buildId);

  return (
    <StyledTable>
      <tbody>
        <StyledTableRow>
          <td>a</td>
          <td>b</td>
          <td>c</td>
        </StyledTableRow>
      </tbody>
    </StyledTable>
  );
}

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid green;
`;

const StyledTableRow = styled.tr`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;
