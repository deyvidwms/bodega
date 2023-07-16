import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center ;
 
  width: 100vw;
  height: 100vh;
  background-color: #ffc971;
`;

export const Title = styled.h1`
  font-family: 'Lilita One', cursive;
  font-size: 15rem;
  text-shadow: 2px 2px 10px rgb(0 0 0 / 25%);
  color: #fff;
`;

export const SubTitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 4rem;
  text-shadow: 2px 2px 10px rgb(0 0 0 / 25%);
  color: #fff;
`;

export const LinkInicio = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  margin-top: 10px;
  text-shadow: 2px 2px 10px rgb(0 0 0 / 25%);

  a {
    color: #fff;
  }
`