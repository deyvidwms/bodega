import { TextField } from '@mui/material';
import React from 'react';

import { Container } from './styles';

const TextFieldElement: React.FC<{name: string, required?: boolean}> = ({name, required}) => {
  return (
    <Container>
      <TextField
        variant='outlined'
        label={name}
        required={required ? true : false}
        size='medium'
        fullWidth
      />
    </Container>
  );
}

export default TextFieldElement;