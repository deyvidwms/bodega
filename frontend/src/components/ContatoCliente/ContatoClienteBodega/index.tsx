import { ActionIcon } from '../../TableElement/styles';
import { FaWhatsapp } from 'react-icons/fa';
import { ContatoCliente } from '../../../interfaces/ContatoCliente';

export default class ContatoClienteBodega implements ContatoCliente {
  render(row: {[key: string]: any}) {
    const onHandleClick = () => {
      const number = row.whatsapp;
      window.open(`https://api.whatsapp.com/send/?phone=55${number}&text=Olá, tudo bem?%0ATemos promoções na nossa Budega.%0AVenha conferir!`)
    }

    return (
      <ActionIcon background='#4fce5d' onClick={onHandleClick}>
        <FaWhatsapp />
      </ActionIcon> 
    );
  }
}