import React from 'react';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import TextFieldElement from '../TextFieldElement';
import { Button } from '@mui/material';

const SideBarForm: React.FC = () => {
  return (
    <Container>
      <Title>Cadastrar produto</Title>

      <ProductRegisterForm>
        <TextFieldElement 
          name='Nome'
          required
        />

        <TextFieldElement 
          name='Descrição'
          required
        />

        <TextFieldElement 
          name='Imagem'
          required
        />

        <TextFieldElement 
          name='Categoria'
          required
        />

        <ButtonsList>
          <Button variant="outlined" sx={{color: '#999', borderColor: '#999'}}>Cancelar</Button>
          <Button variant="contained" color="success">Cadastrar</Button>
        </ButtonsList>
      </ProductRegisterForm>

    </Container>
  );
}

export default SideBarForm;