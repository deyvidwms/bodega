import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 50px;

  @media (max-width: 380px) {
    padding: 20px;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;

  border: 1px solid #CCC;
  border-radius: 3px;
  padding: 10px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:nth-child(1) {
    ${Card} {
      border-left: 5px solid blue;

      svg {
        fill: blue;
      }
    }  
  }

  &:nth-child(2) {
    ${Card} {
      border-left: 5px solid orange;

      svg {
        fill: orange;
      }
    }  
  }

  &:nth-child(3) {
    ${Card} {
      border-left: 5px solid red;

      svg {
        fill: red;
      }
    }  
  }

  &:nth-child(4) {
    ${Card} {
      border-left: 5px solid green;

      svg {
        fill: green;
      }
    }  
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  gap: 10px;

  @media (max-width: 1480px) {
    flex-wrap: wrap;

    ${Column} {
      width: 49%;
    }
  }

  @media (max-width: 970px) {
    gap: 20px;
    
    ${Column} {
      width: 100%;
    }
  }
`;

export const IconTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  color: #515151;

  svg {
    font-size: 2rem;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 1.5rem;
  }

`;

export const Subtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
`;