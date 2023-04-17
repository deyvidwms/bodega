import React from 'react';
import LayoutDashboard from '../../../components/LayoutDashboard';

import { Container } from './styles';

const Produto: React.FC = () => {
  return (
    <LayoutDashboard>
      <Container>
        <h1>Produto</h1>
      </Container>
    </LayoutDashboard>
  );
}

export default Produto;