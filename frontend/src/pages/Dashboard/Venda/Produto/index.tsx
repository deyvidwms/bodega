import React, { useEffect, useState } from 'react';
import { Container, Title } from './styles';
import LayoutDashboard from '../../../../components/LayoutDashboard';
import Row from '../../../../components/Row';
import Column from '../../../../components/Column';
import BreadCrumb from '../../../../components/BreadCrumb';
import ActionButton from '../../../../components/ActionButton';
import TableElement from '../../../../components/TableElement';
import SideBarForm from '../../../../components/SideBarForm';
import TextFieldElement from '../../../../components/TextFieldElement';
import { Masks } from '../../../../assets/ts/Masks';
import SideBarFormEdit from '../../../../components/SideBarFormEdit';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import AutoCompleteElement from '../../../../components/AutoCompleteElement';
import { FormValues } from '../../../../types/FormValues';

type Lote = {
  id: string;
  produto: Produto;
  quantidade: number;
  validade: string;
}

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idCategoriaProduto: number;
}

// type VendaLote = {
//   id: number;
//   quantidade: number;
//   idVenda: number | null;
//   idLote: number;
//   lote: Lote;
// }

type Pessoa = {
  id: number;
  cpf: string;
  nome: string;
  celular: string | null;
  saldoDevedor: any;
  Usuario: any | null;
}

// type Venda = {
//   id: number;
//   vendidoEm: string;
//   vendaLotes: VendaLote[];
//   idComprador: number;
//   comprador: Pessoa;
//   nomeComprador: string;
//   botaoDetalhes: any;
// };

const VendaProduto: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFinalizarVendaForm, setShowSideBarFinalizarVendaForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<{ id: number; nome: string; quantidade: number; validade: string; }[]>([]);
  const [rowId, setRowId] = useState<number>(0);
  const [rowItem, setRowItem] = useState<{ id: number; nome: string; quantidade: number; validade: string; } | null>(null);
  const [lotes, setLotes] = useState<{ id: string; nome: string; quantidade: number; validade: string; }[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Venda',
      link: '/dashboard/venda'
    },
    {
      name: 'Produtos',
      link: '/dashboard/produto'
    }
  ];

  const handleClick = () => {
    setShowSideBarForm(!showSideBarForm);
  }

  const handleClickFinalizar = () => {
    setShowSideBarFinalizarVendaForm(!showSideBarFinalizarVendaForm);
  }

  useEffect(() => {
    const getLotes = () => {
      fetch('http://127.0.0.1:3000/lote')
        .then(response => response.json())
        .then(data => setValuesLote(data))
        .catch(error => console.error(error))
    };

    const setValuesLote = (data: any) => {
      const response: {
        id: string;
        nome: string;
        quantidade: number;
        validade: string;
      }[] = [];
      data.forEach((element: Lote) => {
        const tmpRes = {
          id: element.id,
          nome: element.produto.titulo,
          quantidade: Number(element.quantidade),
          validade: element.validade
        }
        response.push(tmpRes);
      });
      setLotes(response)
    };

    const getClientes = () => {
      fetch('http://127.0.0.1:3000/pessoa')
        .then(response => response.json())
        .then(data => setClientes(data))
        .catch(error => console.error(error))
    };

    const setClientes = (data: any) => {
      const response: Pessoa[] = [];
      data.forEach( (element: Pessoa) => element.Usuario === null && response.push(element) );
      setPessoas(response);
    };

    getLotes();
    getClientes();
  }, []);

  const addProduct = (values: FormValues) => {
    console.log(values);
    const indexLote = lotes.findIndex(element => Number(element.id) === Number(values.idLote));
    console.log(indexLote)
    if (indexLote > -1) {
      const item = {
        id: Number(values.idLote),
        nome: lotes[indexLote].nome,
        quantidade: Number(values.quantidade),
        validade: dayjs(lotes[indexLote].validade).format('DD/MM/YYYY')
      };
      setRows([...rows, item]);
    }
  }

  const editVenda = (id: number) => {
    const indexLote = lotes.findIndex(element => Number(element.id) === id);
    if (indexLote > -1) {
      setRowId(id);    
      setRowItem(rows[indexLote]);
      setShowSideBarFormEdit(true);
    }
  }

  const deleteVenda = (id: number) => {
    const indexLote = lotes.findIndex(element => Number(element.id) === id);
    if (indexLote > -1) {
      setRows(rows.filter((element, index) => index !== indexLote));   
    }
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
            <Title>Produtos da Venda</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: '10px' }}>
            <ActionButton text='Adicionar Produto' onClick={handleClick} />
            {
              rows.length > 0 &&
              <ActionButton text='Finalizar Venda' onClick={handleClickFinalizar} />
            }
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement
              header={['Nome produto', 'Validade', 'Quantidade']}
              rowsField={['nome', 'validade', 'quantidade']}
              rows={rows}
              tableItemName='Produtos'
              handleEdit={editVenda}
              handleDelete={deleteVenda}
            />
          </Column>
        </Row>
      </Container>

      <SideBarForm
        title='Produtos da Venda'
        show={showSideBarForm}
        setShow={setShowSideBarForm}
        currentSchema={3}
        endpoint={'venda'}
        onHandleClick={addProduct}
      >
        <AutoCompleteElement
          label='Produto'
          name='idLote'
          options={
            lotes.map(
              element => ({
                id: Number(element.id),
                nome: `Prod.: ${element.nome} - val.: ${dayjs(element.validade).format('DD/MM/YYYY')}`
              })
            )
          }
          required
        />

        <TextFieldElement
          label='Quantidade do produto'
          name='quantidade'
          maskFunction={Masks.onlyNumbers}
          required
        />
      </SideBarForm>

      <SideBarFormEdit
        title='Produtos da Venda'
        show={showSideBarFormEdit}
        setShow={setShowSideBarFormEdit}
        currentSchema={3}
        endpoint={'venda'}
        idItem={rowId}
        rowItem={rowItem}
        rows={rows}
        setRows={setRows}
      >
        <AutoCompleteElement
          label='Produto'
          name='idLote'
          options={
            lotes.map(
              element => ({
                id: Number(element.id),
                nome: `Prod.: ${element.nome} - val.: ${dayjs(element.validade).format('DD/MM/YYYY')}`
              })
            )
          }
          required
        />

        <TextFieldElement
          label='Quantidade do produto'
          name='quantidade'
          maskFunction={Masks.onlyNumbers}
          required
        />
      </SideBarFormEdit>

      <SideBarForm
        title='Vendas'
        show={showSideBarFinalizarVendaForm}
        setShow={setShowSideBarFinalizarVendaForm}
        currentSchema={4}
        endpoint={'venda'}
      >
        <AutoCompleteElement
          label='Cliente'
          name='idCliente'
          options={
            pessoas.map(
              element => ({
                id: Number(element.id),
                nome: element.nome
              })
            )
          }
        />
      </SideBarForm>
    </LayoutDashboard>
  );
}

export default VendaProduto;
