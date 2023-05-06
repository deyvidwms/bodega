import React, { useEffect, useState } from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';

import { Container, Title } from './styles';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';
import SideBarForm from '../../../components/SideBarForm';
import TextFieldElement from '../../../components/TextFieldElement';
import { Masks } from '../../../assets/ts/Masks';

function createData(
  name: string,
  celular: string,
  linkWhatsApp: string,
) {
  return { name, celular, linkWhatsApp };
}

// const rows: {name: string, celular: string, linkWhatsApp: string}[]  = [];

// const rows = [
//   createData('Cupcake', '(83) 98637-6689', '84998180770'),
//   createData('Donut', '(83) 98637-6689', '84998180770'),
//   createData('Eclair', '(83) 98637-6689', '84998180770'),
//   createData('Frozen yoghurt', '(83) 98637-6689', '84998180770'),
//   createData('Gingerbread', '(83) 98637-6689', '84998180770'),
//   createData('Honeycomb', '(83) 98637-6689', '84998180770'),
//   createData('Ice cream sandwich', '(83) 98637-6689', '84998180770'),
//   createData('Jelly Bean', '(83) 98637-6689', '84998180770'),
//   createData('KitKat', '(83) 98637-6689', '84998180770'),
//   createData('Lollipop', '(83) 98637-6689', '84998180770'),
//   createData('Marshmallow', '(83) 98637-6689', '84998180770'),
//   createData('Nougat', '(83) 98637-6689', '84998180770'),
//   createData('Oreo', '(83) 98637-6689', '84998180770'),
// ];

const Cliente: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [rows, setRows] = useState<{name: string, celular: string, linkWhatsApp: string}[]>([]);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Cliente',
      link: '/dashboard/cliente'
    }
  ];

  const handleClick = () => {
    setShowSideBarForm(true);
  }

  useEffect(() => {
    
    const getClients = () => {
      fetch('http://127.0.0.1:3000/pessoa')
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    };

    getClients();

  }, []);

  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Clientes</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Adicionar Cliente' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement header={['nome', 'celular', 'link whatsapp']} rowsField={['name', 'celular', 'linkWhatsApp']} rows={rows} tableItemName='Lotes' />
          </Column>
        </Row>
      </Container>
      <SideBarForm 
        title='clientes' 
        show={showSideBarForm}
        setShow={setShowSideBarForm}
        currentSchema={0}
        endpoint={'pessoa'}
      >
        <TextFieldElement 
          label='Nome Completo'
          name='nome'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />

        {/* <TextFieldElement 
          label='Apelido'
          name='apelido'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        /> */}

        <TextFieldElement 
          label='CPF'
          name='cpf'
          maskFunction={Masks.cpf}
          required
        />

        <TextFieldElement 
          label='Celular'
          name='celular'
          maskFunction={Masks.cellPhoneNumber}
          required
        />
      </SideBarForm>
    </LayoutDashboard>
  );
}

export default Cliente;