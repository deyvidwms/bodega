import React from 'react';
import { ActionIcon } from '../../TableElement/styles';
import { SiGmail } from 'react-icons/si';

// import { Container } from './styles';

const ContatoClienteLojaDePeca: React.FC = () => {
  return (
    <ActionIcon background='#4fce5d' onClick={()=>console.log('opa')}>
      <SiGmail />
    </ActionIcon> 
  );
}

export default ContatoClienteLojaDePeca;