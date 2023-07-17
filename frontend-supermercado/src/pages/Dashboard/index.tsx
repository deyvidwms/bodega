import React from 'react';
import LayoutDashboard from '../../components/LayoutDashboard';

import { Container, Row, Column, Card, IconTitle, Subtitle } from './styles';

import { FaBox, FaCartPlus, FaDollarSign, FaLayerGroup } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Dashboard: React.FC = () => {
  const handleClickRelatorio = () => {
    fetch('http://localhost:3000/comercio/financeiro/1', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({inicio: '2001-01-01T18:25:43.511Z', fim: String(new Date().toJSON())})
    })
      .then(response => response.json())
      .then( data => window.open(data.link, 'blank') )
      .catch(error => console.log('Erro:', error))
  }

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
        <Row>
          <Column style={{ alignItems: 'flex-start', marginTop: '20px' }}>
            <Button variant='contained' onClick={handleClickRelatorio}>Gerar relatório</Button>
          </Column>
        </Row>
      </Container>
    </LayoutDashboard>
  );
}

export default Dashboard;