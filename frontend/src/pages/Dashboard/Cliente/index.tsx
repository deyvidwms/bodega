import React from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';

import { Container, Title } from './styles';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';

function createData(
  name: string,
  telefone: string,
  linkWhatsApp: string,
) {
  return { name, telefone, linkWhatsApp };
}

const rows = [
  createData('Cupcake', '(83) 98637-6689', '84998180770'),
  createData('Donut', '(83) 98637-6689', '84998180770'),
  createData('Eclair', '(83) 98637-6689', '84998180770'),
  createData('Frozen yoghurt', '(83) 98637-6689', '84998180770'),
  createData('Gingerbread', '(83) 98637-6689', '84998180770'),
  createData('Honeycomb', '(83) 98637-6689', '84998180770'),
  createData('Ice cream sandwich', '(83) 98637-6689', '84998180770'),
  createData('Jelly Bean', '(83) 98637-6689', '84998180770'),
  createData('KitKat', '(83) 98637-6689', '84998180770'),
  createData('Lollipop', '(83) 98637-6689', '84998180770'),
  createData('Marshmallow', '(83) 98637-6689', '84998180770'),
  createData('Nougat', '(83) 98637-6689', '84998180770'),
  createData('Oreo', '(83) 98637-6689', '84998180770'),
];

const Cliente: React.FC = () => {
  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Cliente',
      link: '/dashboard/cliente'
    }
  ];

  const handleClick = () => {
    console.log('clicou');
  }

  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Clientes</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Adicionar Cliente' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement header={['nome', 'telefone', 'link whatsapp']} rowsField={['name', 'telefone', 'linkWhatsApp']} rows={rows} tableItemName='Lotes' />
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Cliente;