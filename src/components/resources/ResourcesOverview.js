import styled from 'styled-components';

export const ResourcesOverview = ({currentResource}) => {

  return (
    <StyledRescourceContainer>
      {currentResource.map((currentRes) => (
        <StyledRescourceSection key={currentRes.id}>
          <StyledRescourceIcon alt={currentRes.name} src={'../images/icons/icon_' + currentRes.name.charAt(0).toLowerCase() + currentRes.name.slice(1) + '.jpg'}></StyledRescourceIcon>
          <StyledRescourceParagraphNumber>{Math.floor(currentRes.value)}</StyledRescourceParagraphNumber>
        </StyledRescourceSection>
      ))}
    </StyledRescourceContainer>
  );
};

const StyledRescourceContainer = styled.div`
  margin-top: 80px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const StyledRescourceSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledRescourceParagraphNumber = styled.p`
  font-size: larger;
`;

const StyledRescourceIcon = styled.img`
  width: 34px;
  height: 34px;
`;
