import styled from 'styled-components';

export const Resource = ({currentRes}) => {

  const lowercaseName = currentRes.name.charAt(0).toLowerCase() + currentRes.name.slice(1);

  return (
    <StyledResourceSection>
      <StyledResourceIcon
        alt={currentRes.name}
        src={'../images/icons/icon_' + lowercaseName + '.jpg'}
      ></StyledResourceIcon>
      <StyledResourceSpanNumber>{Math.floor(currentRes.value)}</StyledResourceSpanNumber>
    </StyledResourceSection>
  );
};

const StyledResourceSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: ${props => props.displayValuePosition === "right" ? "row" : "column"};
  align-items: center;
`;

const StyledResourceSpanNumber = styled.span`
  font-size: larger;
`;

const StyledResourceIcon = styled.img`
  width: 34px;
  height: 34px;
  ${props => props.iconSize !== "small" || 'padding:4px'};
`;
