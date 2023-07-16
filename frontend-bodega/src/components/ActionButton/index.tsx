import React from 'react';

import { Container } from './styles';

const ActionButton: React.FC<{text: string, onClick: () => void}> = ({text, onClick}) => {
  return (
    <Container onClick={onClick}>
      {text}
    </Container>
  );
}

export default ActionButton;