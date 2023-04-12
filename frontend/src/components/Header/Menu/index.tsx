import React from 'react';

import { Container, MenuList, MenuItem } from './styles';

type Props = {
  show: boolean;
}

const Menu: React.FC<Props> = ({show}) => {
  return (
    <Container show={show}>
      <MenuList>
        <MenuItem>
          Perfil
        </MenuItem>
        <MenuItem>
          Configurações
        </MenuItem>
        <MenuItem>
          Sair
        </MenuItem>
      </MenuList>
    </Container>
  );
}

export default Menu;