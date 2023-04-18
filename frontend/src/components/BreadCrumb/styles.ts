import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;

  div {
    display: flex;
    align-items: center;
    gap: 5px;

    color: #515151;
    
    a {
      font-family: 'Roboto', sans-serif;
      font-size: 1rem;
    }

    &:last-child {
      color: #888;
      
      a {
        cursor: default;
      }
    }
  }
`;
