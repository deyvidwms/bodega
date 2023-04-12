import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 100px;
  border-bottom: 1px solid #CCC;

  h1 {
    font-family: 'Dancing Script', cursive;
    font-size: 2.5rem;
  }
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  height: 69px;
  padding: 0 20px;
  cursor: pointer;

  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    font-size: 1rem;
  }

  svg {
    margin-left: 10px;
  }
`;
