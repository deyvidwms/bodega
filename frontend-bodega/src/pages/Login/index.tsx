import React from 'react';
import LayoutLogin from '../../components/LayoutLogin';

import { Column, Title } from './styles';
import CardLogin from '../../components/LayoutLogin/CardLogin';
import Row from '../../components/Row';

import { FaArrowRight } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <LayoutLogin>
      <CardLogin>
        <Title>Budega's Store</Title>
        <Row>
          <Column>
            <label htmlFor="">Login</label>
            <input type="text" id="login" />
          </Column>
        </Row>
        <Row>
          <Column>
            <label htmlFor="">Senha</label>
            <input type="password" />
          </Column>
        </Row>
        <Row>
          <Column>
            <button>Entrar</button>
          </Column>
        </Row>
        <Row>
          <Column>
            <a href="#">Esqueci a senha <FaArrowRight /></a>
          </Column>
        </Row>
      </CardLogin>
    </LayoutLogin>
  );
}

export default Login;