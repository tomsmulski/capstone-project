import styled from 'styled-components';

export const Resource = ({currentRess}) => {
  const lowercaseName = currentRess.name.charAt(0).toLowerCase() + currentRess.name.slice(1);

  return (
    <StyledResourceSection>
      <StyledResourceIcon
        alt={currentRess.name}
        src={'../images/icons/icon_' + lowercaseName + '.jpg'}
      ></StyledResourceIcon>
      <StyledResourceSpanNumber>{Math.floor(currentRess.value)}</StyledResourceSpanNumber>
    </StyledResourceSection>
  );
};

const StyledResourceSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.displayValuePosition === 'right' ? 'row' : 'column')};
  align-items: center;
`;

const StyledResourceSpanNumber = styled.span`
  font-size: large;
`;

const StyledResourceIcon = styled.img`
  width: 34px;
  height: 34px;
  ${props => props.iconSize !== 'small' || 'padding:4px'};
`;
