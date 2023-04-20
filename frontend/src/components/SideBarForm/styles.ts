import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 400px;
  padding: 50px 20px;
  right: 0;
  background-color: #FFF;
  height: calc(100vh - 70px);
  border-left: 1px solid #CCC;
  box-shadow: 0 0 10px rgb( 127 127 127 / 45%);

  /* @media (max-width: 800px) {
    position: absolute;
    transform: translateX(-100%);
  } */
`;

export const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
  text-align: center;
`;

export const ProductRegisterForm = styled.form`

`;

export const ButtonsList = styled.div`
  display: flex;
  gap: 20px;
`;