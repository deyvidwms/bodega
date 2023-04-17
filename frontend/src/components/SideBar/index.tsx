import React, { useState } from 'react';

import { FaBox, FaCaretRight, FaCartPlus, FaHome, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";

import { Container, Menu, OptionList, OptionTitle } from './style';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
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
  const [sellActive, setSellActive] = useState<boolean>(
    window.location.pathname === '/dashboard/venda' ||
    window.location.pathname === '/dashboard/venda/'
  );

  const handleClickShowMenuList = (option: string) => {
    setHomeActive(option === 'home');
    setProductActive(option === 'product');
    setBatchActive(option === 'batch');
    setSellActive(option === 'sell');
  };

  return (
    <Container>
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