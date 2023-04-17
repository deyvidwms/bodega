import React from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';

import { Container, Row, Column, Card, IconTitle, Subtitle } from './styles';

import { FaBox, FaCartPlus, FaDollarSign, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <Link to={'/dashboard/produto'}>
              <Card>
                <IconTitle>
                  <FaBox /> <p>Produtos</p>
                </IconTitle>
                <Subtitle>
                  Visualize seus produtos aqui
                </Subtitle>
              </Card>
            </Link>
          </Column>
          <Column>
            <Link to={'/dashboard/lote'}>
              <Card>
                <IconTitle>
                  <FaLayerGroup /> <p>Lotes</p>
                </IconTitle>
                <Subtitle>
                  Visualize seus lotes aqui
                </Subtitle>
              </Card>
            </Link>
          </Column>
          <Column>
            <Link to={'/dashboard/gastos'}>
              <Card>
                <IconTitle>
                  <FaDollarSign /> <p>Gastos</p>
                </IconTitle>
                <Subtitle>
                  Fique por dentro dos seus gastos
                </Subtitle>
              </Card>
            </Link>
          </Column>
          <Column>
            <Link to={'/dashboard/venda'}>
              <Card>
                <IconTitle>
                  <FaCartPlus /> <p>Vendas</p>
                </IconTitle>
                <Subtitle>
                  Tenha o controle de suas vendas
                </Subtitle>
              </Card>
            </Link>
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Dashboard;