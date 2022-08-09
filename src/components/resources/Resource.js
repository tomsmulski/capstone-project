import styled from 'styled-components';
import Images from '../../images';

export const Resource = ({currentResources, displayValuePosition, iconSize, color}) => {
  return (
    <StyledResourceSection displayValuePosition={displayValuePosition}>
      <StyledResourceIcon
        alt={currentResources.name}
        src={Images.icon[currentResources.name]}
        iconSize={iconSize}
      ></StyledResourceIcon>
      <StyledResourceSpanNumber color={color}>{Math.floor(currentResources.value)}</StyledResourceSpanNumber>
    </StyledResourceSection>
  );
};

const StyledResourceSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: ${props => (props.displayValuePosition === 'right' ? 'row' : 'column')};
  align-items: center;
  justify-content: space-around;
  margin: 0;
`;

const StyledResourceSpanNumber = styled.span`
  font-size: large;
  color: ${props => props.color};
  padding: 5px;
`;

const StyledResourceIcon = styled.img`
  width: ${props => (props.iconSize === 'small' ? '25px' : '34px')};
  height: ${props => (props.iconSize === 'small' ? '25px' : '34px')};
`;
