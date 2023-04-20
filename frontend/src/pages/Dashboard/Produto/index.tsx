import React from 'react';
import LayoutDashboard from '../../../components/LayoutDashboard';

import BreadCrumb from '../../../components/BreadCrumb';
import Row from '../../../components/Row';
import Column from '../../../components/Column';

import { Container, Title } from './styles';
import TableElement from '../../../components/TableElement';
import ActionButton from '../../../components/ActionButton';

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
            <TableElement header={['nome', 'descrição']} tableItemName='Produtos' />
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Produto;