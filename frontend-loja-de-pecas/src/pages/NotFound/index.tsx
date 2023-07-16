import React from 'react';

import { Container, LinkInicio, SubTitle, Title } from './styles';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Title>404</Title>
      <SubTitle>Página não encontrada</SubTitle>
      <LinkInicio>
        <Link to="/" >
          Voltar para o início
        </Link>
      </LinkInicio>
    </Container>
  );  
}

export default NotFound;