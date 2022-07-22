import styled from 'styled-components';

export const Resource = ({displayValuePosition,iconSize, currentRes}) => {
  return (
    <StyledRescourceSection displayValuePosition={displayValuePosition}>
      <StyledRescourceIcon
        alt={currentRes.name}
        src={'../images/icons/icon_' + currentRes.name.charAt(0).toLowerCase() + currentRes.name.slice(1) + '.jpg'}
        iconSize={iconSize}
      ></StyledRescourceIcon>
      <StyledRescourceParagraphNumber>{Math.floor(currentRes.value)}</StyledRescourceParagraphNumber>
    </StyledRescourceSection>
  );
};

const StyledRescourceSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: ${props => props.displayValuePosition === "right" ? "row" : "column"};
  align-items: center;
`;

const StyledRescourceParagraphNumber = styled.p`
  font-size: larger;
`;

const StyledRescourceIcon = styled.img`
  width: 34px;
  height: 34px;
  ${props => props.iconSize !== "small" || 'padding:4px'};
`;
