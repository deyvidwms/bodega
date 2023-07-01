import React from 'react';
import { ActionIcon } from '../../TableElement/styles';
import { FaPhoneAlt } from 'react-icons/fa';

// import { Container } from './styles';

const ContatoClienteSupermercado: React.FC = () => {
  return (
    <ActionIcon background='#4fce5d' onClick={()=>console.log('opa')}>
      <FaPhoneAlt />
    </ActionIcon> 
  );
}

export default ContatoClienteSupermercado;