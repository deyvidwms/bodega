import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fbb940;
  padding: 0 100px;
  border-bottom: 1px solid #CCC;
  transition: all ease 0.3s;

  h1 {
    font-family: 'Dancing Script', cursive;
    font-size: 2.5rem;
  }

  @media (max-width: 800px) {
    padding: 10px 50px;
  }

  @media (max-width: 380px) {
    flex-direction: column;
    gap: 20px;
    padding: 10px 0;
  }
`;

export const Navbar = styled.div`
  display: flex;
  align-items: center;
  height: 69px;
  padding: 0 20px;
  
  p {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    font-size: 1rem;
  }

  svg {
    margin-left: 10px;
  }
`;
