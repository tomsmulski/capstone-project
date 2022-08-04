import styled from 'styled-components';

export const Resource = ({currentRess, displayValuePosition, iconSize, color}) => {
  return (
    <>
      <StyledResourceSection displayValuePosition={displayValuePosition}>
        <StyledResourceIcon
          alt={currentRess.name}
          src={'../images/icons/icon_' + currentRess.name + '.jpg'}
          iconSize={iconSize}
        ></StyledResourceIcon>
        <StyledResourceSpanNumber color={color}>{Math.floor(currentRess.value)}</StyledResourceSpanNumber>
      </StyledResourceSection>
    </>
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
  color: ${props => props.color};
`;

const StyledResourceIcon = styled.img`
  width: 34px;
  height: 34px;
  ${props => props.iconSize !== 'small' || 'padding:4px'};
`;
