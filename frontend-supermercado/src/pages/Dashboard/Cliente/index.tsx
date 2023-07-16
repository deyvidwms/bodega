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
import CurrencyFieldElement from '../../../components/CurrencyFieldElement';
import SideBarFormEdit from '../../../components/SideBarFormEdit';

function createData(
  name: string,
  celular: string,
  linkWhatsApp: string,
) {
  return { name, celular, linkWhatsApp };
}

type Pessoa = {
  id: number,
  cpf: string,
  nome: string,
  apelido: string | null,
  celular: string,
  endereco: string | null,
  cliente: boolean,
  saldoDevedor: string,
  usuario: any | null,
}

const Cliente: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<Pessoa[]>([]);
  const [rowId, setRowId] = useState<number>(0);

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
        .then(data => setClients(data))
        .catch(error => console.error(error))
    };

    const setClients = (data: any) => {
      const response: Pessoa[] = [];
      data.forEach( (element: Pessoa) => element.usuario === null && response.push(element) );
      setRows(response)
    };

    getClients();
  }, []);


  const editClient = (id: number) => {
    setRowId(id);
    setShowSideBarFormEdit(true);
  }

  const deleteClient = (id: number) => {
    fetch(`http://127.0.0.1:3000/pessoa/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => window.location.reload())
      .catch(error => console.error(error))
  }

  useEffect(() => {
    console.log('rows', rows)
  }, [rows])

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
            <TableElement 
              header={['nome', 'celular', 'saldo devedor']} 
              rowsField={['nome', 'celular', 'saldoDevedor']} 
              rows={rows} 
              tableItemName='Clientes'
              handleEdit={editClient}
              handleDelete={deleteClient}
            />
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

      <SideBarFormEdit 
        title='clientes' 
        show={showSideBarFormEdit}
        setShow={setShowSideBarFormEdit}
        currentSchema={0}
        endpoint={'pessoa'}
        idItem={rowId}
      >
        <TextFieldElement 
          label='Nome Completo'
          name='nome'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />

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

        <CurrencyFieldElement
          label='Saldo Devedor'
          name='saldoDevedor'
          maskFunction={Masks.currency}
          required
        />

      </SideBarFormEdit>
    </LayoutDashboard>
  );
}

export default Cliente;