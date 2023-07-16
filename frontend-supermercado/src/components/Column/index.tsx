import React from 'react';

import { Container } from './styles';

const Column: React.FC<{children: React.ReactNode, style?: React.CSSProperties | undefined}> = ({children, style}) => {
  return (
    <Container style={style}>
      {children}
    </Container>
  );
}

export default Column;