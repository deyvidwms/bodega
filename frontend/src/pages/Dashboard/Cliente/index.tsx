import React from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';

import { Container } from './styles';

const Cliente: React.FC = () => {
  return (
    <LayoutDashboard>
      <Container>
        <h1>Cliente</h1>
      </Container>
    </LayoutDashboard>
  );
}

export default Cliente;