import React, { useState } from 'react';

import { FaBox, FaCaretRight, FaCartPlus, FaHome, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";

import { Container, Menu, OptionList, OptionTitle } from './style';
import { Link } from 'react-router-dom';

const SideBar: React.FC = () => {
  const [homeActive, setHomeActive] = useState<boolean>(true);
  const [productActive, setProductActive] = useState<boolean>(false);
  const [batchActive, setBatchActive] = useState<boolean>(false);
  const [sellActive, setSellActive] = useState<boolean>(false);

  const handleClickShowMenuList = (option: string) => {
    setHomeActive(option === 'home');
    setProductActive(option === 'product');
    setBatchActive(option === 'batch');
    setSellActive(option === 'sell');
  };

  return (
    <Container>
      <Menu>
        <OptionList
          show={homeActive}
          onClick={() => handleClickShowMenuList('home')}
        >
          <OptionTitle>
            <Link to={'/dashboard/'}><FaHome /> Inicio</Link>
          </OptionTitle>
        </OptionList>
        <OptionList 
          show={productActive} 
          onClick={() => handleClickShowMenuList('product')}
        >
          <OptionTitle>
            <Link to={'/dashboard/produto'}><FaBox /> Produtos</Link>
          </OptionTitle> 
        </OptionList>
        <OptionList 
          show={batchActive}
          onClick={() => handleClickShowMenuList('batch')}
        >
          <OptionTitle>
            <Link to={'/dashboard/lote'}><FaLayerGroup /> Lotes</Link>
          </OptionTitle> 
        </OptionList>
        <OptionList
          show={sellActive}
          onClick={() => handleClickShowMenuList('sell')}
        >
          <OptionTitle>
            <Link to={'/dashboard/venda'}><FaCartPlus /> Vendas</Link>
          </OptionTitle>
        </OptionList>
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