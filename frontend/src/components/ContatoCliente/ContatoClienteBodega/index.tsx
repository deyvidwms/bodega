import React from 'react';
import { ActionIcon } from '../../TableElement/styles';
import { FaWhatsapp } from 'react-icons/fa';

// import { Container } from './styles';

const ContatoClienteBodega: React.FC = () => {
  return (
    <ActionIcon background='#4fce5d' onClick={()=>console.log('opa')}>
      <FaWhatsapp />
    </ActionIcon> 
  );
}

export default ContatoClienteBodega;