import React from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';

import { Container, Row, Column, Card, IconTitle, Subtitle } from './styles';

import { FaBox, FaCartPlus, FaDollarSign, FaLayerGroup } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <Card>
              <IconTitle>
                <FaBox /> <p>Produtos</p>
              </IconTitle>
              <Subtitle>
                Visualize seus produtos aqui
              </Subtitle>
            </Card>
          </Column>
          <Column>
            <Card>
              <IconTitle>
                <FaLayerGroup /> <p>Lotes</p>
              </IconTitle>
              <Subtitle>
                Visualize seus lotes aqui
              </Subtitle>
            </Card>
          </Column>
          <Column>
            <Card>
              <IconTitle>
                <FaDollarSign /> <p>Gastos</p>
              </IconTitle>
              <Subtitle>
                Fique por dentro dos seus gastos
              </Subtitle>
            </Card>
          </Column>
          <Column>
            <Card>
              <IconTitle>
                <FaCartPlus /> <p>Vendas</p>
              </IconTitle>
              <Subtitle>
                Tenha o controle de suas vendas
              </Subtitle>
            </Card>
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Dashboard;