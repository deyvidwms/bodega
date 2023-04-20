import React from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';

import { Container, Title } from './styles';

function createData(
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [
  createData('Cupcake', 'Descrição do lote'),
  createData('Donut', 'Descrição do lote'),
  createData('Eclair', 'Descrição do lote'),
  createData('Frozen yoghurt', 'Descrição do lote'),
  createData('Gingerbread', 'Descrição do lote'),
  createData('Honeycomb', 'Descrição do lote'),
  createData('Ice cream sandwich', 'Descrição do lote'),
  createData('Jelly Bean', 'Descrição do lote'),
  createData('KitKat', 'Descrição do lote'),
  createData('Lollipop', 'Descrição do lote'),
  createData('Marshmallow', 'Descrição do lote'),
  createData('Nougat', 'Descrição do lote'),
  createData('Oreo', 'Descrição do lote'),
];

const Lote: React.FC = () => {
  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Lote',
      link: '/dashboard/lote'
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
            <Title>Lote</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Adicionar Lote' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement header={['nome', 'descrição']} rowsField={['name', 'description']} rows={rows} tableItemName='Lotes' />
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Lote;