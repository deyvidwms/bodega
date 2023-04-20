import React from 'react';
import LayoutDashboard from '../../../components/LayoutDashboard';

import BreadCrumb from '../../../components/BreadCrumb';
import Row from '../../../components/Row';
import Column from '../../../components/Column';

import { Container, Title } from './styles';
import TableElement from '../../../components/TableElement';
import ActionButton from '../../../components/ActionButton';
import SideBarForm from '../../../components/SideBarForm';

function createData(
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [
  createData('Cupcake', 'Descrição do produto'),
  createData('Donut', 'Descrição do produto'),
  createData('Eclair', 'Descrição do produto'),
  createData('Frozen yoghurt', 'Descrição do produto'),
  createData('Gingerbread', 'Descrição do produto'),
  createData('Honeycomb', 'Descrição do produto'),
  createData('Ice cream sandwich', 'Descrição do produto'),
  createData('Jelly Bean', 'Descrição do produto'),
  createData('KitKat', 'Descrição do produto'),
  createData('Lollipop', 'Descrição do produto'),
  createData('Marshmallow', 'Descrição do produto'),
  createData('Nougat', 'Descrição do produto'),
  createData('Oreo', 'Descrição do produto'),
];

const Produto: React.FC = () => {
  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Produto',
      link: '/dashboard/produto'
    }
  ];

  const handleClick = () => {
    console.log('clicou')
  }

  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Produtos</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{alignItems: 'flex-end'}}>
            <ActionButton text='Adicionar produto' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement header={['nome', 'descrição']} rowsField={['name', 'description']} rows={rows} tableItemName='Produtos' />
          </Column>
        </Row>
      </Container>
      <SideBarForm />
    </LayoutDashboard>
  );
}

export default Produto;