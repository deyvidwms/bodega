import React, { useEffect, useState } from 'react';
import ContatoClienteBodega from './ContatoClienteBodega';

import ContatoClienteSupermercado from './ContatoClienteSupermercado';
import ContatoClienteLojaDePeca from './ContatoClienteLojaDePeca';

type Props = {
  rowsField: string[],
  handleClick: () => void,
}

const ContatoCliente: React.FC<Props> = ({rowsField, handleClick}) => {
  const [tipoContato, setTipoContato] = useState<string>('whatsapp');

  useEffect(() => {
    if ( rowsField.indexOf('whatsapp') !== -1 )
      setTipoContato('whatsapp');
    else if ( rowsField.indexOf('celular') !== -1 )
      setTipoContato('celular');
    else if ( rowsField.indexOf('email') !== -1 )
      setTipoContato('email');
  }, []);


  useEffect(() => {
    console.log(tipoContato)
  }, [tipoContato]);

  return (
    <>
      { tipoContato === 'whatsapp' && <ContatoClienteBodega /> }
      { tipoContato === 'celular' && <ContatoClienteSupermercado /> }
      { tipoContato === 'email' && <ContatoClienteLojaDePeca /> }
    </>
  );
}

export default ContatoCliente;