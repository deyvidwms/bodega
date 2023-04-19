import styled from 'styled-components';

export const Container = styled.button`
  padding: 10px 25px;
  background-color: #fbb940;
  border: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #FFF;
  border-radius: 3px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    opacity: 0.8;
    scale: 1.05;
  }

  @media (max-width: 460px) {
    width: 100%;
    margin-top: 20px;
  }
`;
