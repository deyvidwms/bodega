import React from 'react';
import { ActionIcon } from '../../TableElement/styles';
import { FaPhoneAlt } from 'react-icons/fa';
import { ContatoCliente } from '../../../interfaces/ContatoCliente';

export default class ContatoClienteSupermercado implements ContatoCliente {
  render(row: {[key: string]: any}) {
    const onHandleClick = () => {
      const number = row.celular;
      window.open(`tel:+55${number}`)
    }

    return (
      <ActionIcon background='#4885F4' onClick={onHandleClick}>
        <FaPhoneAlt />
      </ActionIcon>
    );
  }
}