import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 50px;

  @media (max-width: 380px) {
    padding: 20px;
  }
`;

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
`;

export const SuccessMessage = styled.div`
  padding: 10px;
  text-align: center;

  svg {
    font-size : 5rem;
    color: #008000;
    margin-bottom: 10px;
  }

  p {
    font-family: 'Roboto', sans-serif;
    font-size: 1.5rem;
    
    span {
      text-transform: capitalize;
    }
  }
`;