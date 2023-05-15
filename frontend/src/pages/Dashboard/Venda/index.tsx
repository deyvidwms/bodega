import React, { useEffect, useState } from 'react';
import { Container, Title } from './styles';
import LayoutDashboard from '../../../components/LayoutDashboard';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';
import SideBarForm from '../../../components/SideBarForm';
import TextFieldElement from '../../../components/TextFieldElement';
import { Masks } from '../../../assets/ts/Masks';
import SideBarFormEdit from '../../../components/SideBarFormEdit';

type Lote = {
  id: number;
  quantidadeInicial: number;
  quantidadeAtual: number;
  validade: Date | null;
  compradoEm: Date;
  custo: any;
  precoVenda: any;
  precoVendaPromocao: any;
  emPromocao: boolean;
  idCriador: number;
  idProduto: number;
};

type VendaLote = {
  id: number;
  quantidade: number;
  idVenda: number | null;
  idLote: number;
  lote: Lote;
};

type Venda = {
  id: number;
  vendidoEm: Date;
  vendaLotes: VendaLote[];
};

const VendaComponent: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<Venda[]>([]);
  const [rowId, setRowId] = useState<number>(0);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Venda',
      link: '/dashboard/venda'
    }
  ];

  const handleClick = () => {
    setShowSideBarForm(!showSideBarForm);
  }

  useEffect(() => {
    const getVendas = () => {
      fetch('http://127.0.0.1:3000/venda')
        .then(response => response.json())
        .then(data => setVendas(data))
        .catch(error => console.error(error))
    };

    const setVendas = (data: any) => {
      const response: Venda[] = [];
      data.pessoas.forEach((element: Venda) => response.push(element));
      setRows(response);
    };

    getVendas();
  }, []);

  const editVenda = (id: number) => {
    setRowId(id);
    setShowSideBarFormEdit(true);
  }

  const deleteVenda = (id: number) => {
    fetch(`http://127.0.0.1:3000/venda/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => window.location.reload())
      .catch(error => console.error(error))
  }

  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Vendas</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Nova Venda' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement
              header={['nome', 'celular', 'saldo devedor']}
              rowsField={['nome', 'celular', 'saldoDevedor']}
              rows={rows}
              tableItemName='Clientes'
              handleEdit={editVenda}
              handleDelete={deleteVenda}
            />
          </Column>
        </Row>
      </Container>

      <SideBarForm
        title='Vendas'
        show={showSideBarForm}
        setShow={setShowSideBarForm}
        currentSchema={0}
        endpoint={'venda'}
      >
        <TextFieldElement
          label='Item'
          name='nome'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />
      </SideBarForm>

      <SideBarFormEdit
        title='Vendas'
        show={showSideBarFormEdit}
        setShow={setShowSideBarFormEdit}
        currentSchema={1}
        endpoint={'venda'}
        idItem={rowId}
      >
        <TextFieldElement
          label='Nome Completo'
          name='nome'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />
      </SideBarFormEdit>
    </LayoutDashboard>
  );
}

export default VendaComponent;
