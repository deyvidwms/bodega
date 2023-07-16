import React from 'react';

import { Container } from './styles';

const Row: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Row;