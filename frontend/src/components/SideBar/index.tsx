import React, { useState } from 'react';

import { FaBox, FaCaretRight, FaCartPlus, FaHome, FaLayerGroup, FaSignOutAlt } from "react-icons/fa";

import { Container, Menu, OptionList, Option, OptionTitle } from './style';

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
          <OptionTitle><FaHome /> Inicio</OptionTitle>
        </OptionList>
        <OptionList 
          show={productActive} 
          onClick={() => handleClickShowMenuList('product')}
        >
          <OptionTitle>
            <FaBox /> Produtos
          </OptionTitle> 
          <Option>Cadastrar</Option>
          <Option>Editar</Option>
        </OptionList>
        <OptionList 
          show={batchActive}
          onClick={() => handleClickShowMenuList('batch')}
        >
          <OptionTitle><FaLayerGroup /> Lotes</OptionTitle> 
          <Option>Cadastrar</Option>
          <Option>Editar</Option>
        </OptionList>
        <OptionList
          show={sellActive}
          onClick={() => handleClickShowMenuList('sell')}
        >
          <OptionTitle><FaCartPlus /> Vendas</OptionTitle>
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