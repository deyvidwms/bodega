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
import { Link } from 'react-router-dom';

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
  idComprador: number;
  vendaLotes: VendaLote[];
  vendidoEm: Date;
};

const Venda: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<{id: number, nome: string, vendidoEm: string, valorVenda: string }[]>([]);
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

  useEffect(() => {
    const getVendas = () => {
      fetch('http://127.0.0.1:3000/venda')
        .then(response => response.json())
        .then(data => setVendas(data))
        .catch(error => console.error(error))
    };

    const setVendas = (data: any) => {
      const response: {id: number, nome: string, vendidoEm: string, valorVenda: string }[] = [];
            
      data.forEach((element: Venda) => { 
        let totalVenda = 0;

        element.vendaLotes.forEach( vendaLote => {
          totalVenda += vendaLote.quantidade * ( vendaLote.lote.emPromocao ? vendaLote.lote.precoVendaPromocao : vendaLote.lote.precoVenda );
        });

        const venda = {
          id: element.id,
          nome: element.idComprador !== null ? 'Comprador '+element.idComprador : 'Compra anônima',
          vendidoEm: new Date(String(element.vendidoEm).substring(0,10)).toLocaleDateString(),
          valorVenda: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format( Number(totalVenda) ),
        };

        response.push(venda);
      });
      
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
            <Link to={'/dashboard/venda/produto'}>
              <ActionButton text='Nova Venda' onClick={()=>{}}/>
            </Link>
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement
              header={['comprador', 'data da venda', 'valor da venda']}
              rowsField={['nome', 'vendidoEm', 'valorVenda']}
              rows={rows}
              tableItemName='Vendas'
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

export default Venda;
