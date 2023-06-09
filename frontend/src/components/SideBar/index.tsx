import React, { useState } from 'react';

import { FaBox, FaCaretRight, FaCartPlus, FaHome, FaLayerGroup, FaSignOutAlt, FaUsers } from "react-icons/fa";

import { Container, Menu, OptionList, OptionTitle } from './style';
import { Link } from 'react-router-dom';

type Props = {
  showSideBar: boolean;
}

const SideBar: React.FC<Props> = ({ showSideBar }) => {
  const [homeActive, setHomeActive] = useState<boolean>(
    window.location.pathname === '/dashboard' ||
    window.location.pathname === '/dashboard/'
  );
  const [productActive, setProductActive] = useState<boolean>(
    window.location.pathname === '/dashboard/produto' ||
    window.location.pathname === '/dashboard/produto/'
  );
  const [batchActive, setBatchActive] = useState<boolean>(
    window.location.pathname === '/dashboard/lote' ||
    window.location.pathname === '/dashboard/lote/'
  );
  const [clientActive, setClientActive] = useState<boolean>(
    window.location.pathname === '/dashboard/cliente' ||
    window.location.pathname === '/dashboard/cliente/'
  );
  const [sellActive, setSellActive] = useState<boolean>(
    window.location.pathname === '/dashboard/venda' ||
    window.location.pathname === '/dashboard/venda/'
  );

  const handleClickShowMenuList = (option: string) => {
    setHomeActive(option === 'home');
    setProductActive(option === 'product');
    setBatchActive(option === 'batch');
    setClientActive(option === 'client');
    setSellActive(option === 'sell');
  };

  return (
    <Container show={showSideBar}>
      <Menu>
        <Link to={'/dashboard/'}>
          <OptionList
            show={homeActive}
            onClick={() => handleClickShowMenuList('home')}
          >
            <OptionTitle>
              <FaHome /> Inicio
            </OptionTitle>
          </OptionList>
        </Link>
        <Link to={'/dashboard/produto'}>
          <OptionList
            show={productActive}
            onClick={() => handleClickShowMenuList('product')}
          >
            <OptionTitle>
              <FaBox /> Produtos
            </OptionTitle>
          </OptionList>
        </Link>
        <Link to={'/dashboard/lote'}>
          <OptionList
            show={batchActive}
            onClick={() => handleClickShowMenuList('batch')}
          >
            <OptionTitle>
              <FaLayerGroup /> Lotes
            </OptionTitle>
          </OptionList>
        </Link>
        <Link to={'/dashboard/cliente'}>
          <OptionList
            show={clientActive}
            onClick={() => handleClickShowMenuList('client')}
          >
            <OptionTitle>
              <FaUsers /> Clientes
            </OptionTitle>
          </OptionList>
        </Link>
        <Link to={'/dashboard/venda'}>
        <OptionList
          show={sellActive}
          onClick={() => handleClickShowMenuList('sell')}
        >
          <OptionTitle>
            <FaCartPlus /> Vendas
          </OptionTitle>
        </OptionList>
        </Link>
        <OptionList
          onClick={() => handleClickShowMenuList('exit')}
        >
          <OptionTitle><FaSignOutAlt fill="#ff0000" /> Sair</OptionTitle>
        </OptionList>
      </Menu>
    </Container>
  );
}

export default SideBar;