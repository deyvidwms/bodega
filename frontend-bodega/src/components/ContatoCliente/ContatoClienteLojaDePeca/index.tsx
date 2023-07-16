import { ActionIcon } from '../../TableElement/styles';
import { SiGmail } from 'react-icons/si';
import { ContatoCliente } from '../../../interfaces/ContatoCliente';

export default class ContatoClienteLojaDePeca implements ContatoCliente {
  render(row: {[key: string]: any}) {
    const onHandleClick = () => {
      const email = row.email;
      window.open(`mailto:${email}@gmail.com?subject=Novidades%20na%20nossa%20bodega&body=Olá,2%0tudo%20bem?%0ATemos promoções na nossa Budega.%0AVenha conferir!`)
    }

    return (
      <ActionIcon background='#DB4A39' onClick={onHandleClick}>
        <SiGmail />
      </ActionIcon> 
    );
  }
}