import styled from 'styled-components';
import Images from '../../images';
import {Icon} from '@iconify/react';

export const Resource = ({currentResources, displayValuePosition, color}) => {
  return (
    <StyledResourceSection displayValuePosition={displayValuePosition}>
      {displayValuePosition !== 'right' ? (
        <StyledResourceIcon alt={currentResources.name} src={Images.icon[currentResources.name]}></StyledResourceIcon>
      ) : (
        <Icon icon="simple-line-icons:energy" />
      )}

      <StyledResourceSpanNumber color={color}>{Math.floor(currentResources.value)}</StyledResourceSpanNumber>
    </StyledResourceSection>
  );
};

const StyledResourceSection = styled.section`
  width: 66px;
  position: relative;
  display: flex;
  flex-direction: ${props => (props.displayValuePosition === 'right' ? 'row' : 'column')};
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: ${props => (props.displayValuePosition === 'right' ? '0 10px 0 10px' : '0')};
`;

const StyledResourceSpanNumber = styled.span`
  font-size: 16px;
  color: ${props => props.color};
  padding: 0 5px 5px 5px;
  font-family: var(--font-family-third);
`;

const StyledResourceIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 10px;
`;
