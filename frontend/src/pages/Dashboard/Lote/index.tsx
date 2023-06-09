import React, { useEffect, useState } from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';

import { Container, Title } from './styles';
import SideBarForm from '../../../components/SideBarForm';
import TextFieldElement from '../../../components/TextFieldElement';
import AutoCompleteElement from '../../../components/AutoCompleteElement';
import { Masks } from '../../../assets/ts/Masks';
import DateElement from '../../../components/DateElement';
import dayjs from 'dayjs';
import SideBarFormEdit from '../../../components/SideBarFormEdit';
import SelectFieldElement from '../../../components/SelectFieldElement';
import CurrencyFieldElement from '../../../components/CurrencyFieldElement';

type Lote = {
  quantidadeInicial: number;
  quantidadeAtual: number;
  validade: string;
  compradoEm: string;
  custo: number;
  precoVenda: number;
  precoVendaPromocao: number;
  emPromocao: boolean;
  produto: Produto;
  idCriador: number;
  idProduto: number;
  nomeProduto: string;
  validadeFormated: string;
}

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idCategoriaProduto: number;
}

const Lote: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<Lote[]>([]);
  const [rowId, setRowId] = useState<number>(0);
  const [produtos, setProdutos] = useState<{ id: number, nome: string }[]>([]);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Lote',
      link: '/dashboard/lote'
    }
  ];

  const handleClick = () => {
    setShowSideBarForm(!showSideBarForm);
  }

  useEffect(() => {
    const getLotes = () => {
      fetch('http://127.0.0.1:3000/lote')
        .then(response => response.json())
        .then(data => setLotes(data))
        .catch(error => console.error(error))
    };

    const setLotes = (data: any) => {
      const response: Lote[] = [];
      data.forEach((element: Lote) => {
        element['nomeProduto'] = element.produto.titulo;
        element['validadeFormated'] = dayjs(element.validade).format('DD/MM/YYYY');
        response.push(element);
      });
      setRows(response)
    };


    const getProducts = () => {
      fetch('http://127.0.0.1:3000/produto')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
    };

    const setProducts = (data: any) => {
      const response: { id: number, nome: string }[] = [];
      data.forEach((element: Produto) => {
        const tmpProduto = {
          id: element.id,
          nome: element.titulo
        };
        response.push(tmpProduto)
      });
      setProdutos(response)
    };

    getLotes();
    getProducts();
  }, []);

  const editLote = (id: number) => {
    setRowId(id);
    setShowSideBarFormEdit(true);
  }

  const deleteLote = (id: number) => {
    fetch(`http://127.0.0.1:3000/lote/${id}`, {
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
            <Title>Lotes</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Adicionar Lote' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement
              header={['Produto', 'Data de Validade']}
              rowsField={['nomeProduto', 'validadeFormated']}
              rows={rows}
              tableItemName='Lotes'
              handleEdit={editLote}
              handleDelete={deleteLote}
            />
          </Column>
        </Row>
      </Container>
      <SideBarForm
        title='Lotes'
        show={showSideBarForm}
        setShow={setShowSideBarForm}
        currentSchema={2}
        endpoint={'lote'}
        style={{ overflowY: 'scroll' }}
      >
        <AutoCompleteElement
          label='Produto'
          name='idProduto'
          options={produtos}
          required
        />

        <TextFieldElement
          label='Quantidade Inicial'
          name='quantidadeInicial'
          maskFunction={Masks.onlyNumbers}
          required
        />

        <TextFieldElement
          label='Quantidade Atual'
          name='quantidadeAtual'
          maskFunction={Masks.onlyNumbers}
          required
        />

        <DateElement
          label='Comprado em'
          name='compradoEm'
          required
        />

        <DateElement
          label='Validade'
          name='validade'
          required
        />

        <CurrencyFieldElement
          label='Custo'
          name='custo'
          maskFunction={Masks.currency}
          required
        />

        <CurrencyFieldElement
          label='Preço da venda'
          name='precoVenda'
          maskFunction={Masks.currency}
          required
        />

        <SelectFieldElement
          label='O produto está em promoção? *'
          name='emPromocao'
          options={[{ id: 1, name: 'Não', value: '0' }, { id: 2, name: 'Sim', value: '1' }]}
          required
        />

        <CurrencyFieldElement
          label='Preço da venda em promoção'
          name='precoVendaPromocao'
          maskFunction={Masks.currency}
          required
        />
      </SideBarForm>

      <SideBarFormEdit
        title='lotes'
        show={showSideBarFormEdit}
        setShow={setShowSideBarFormEdit}
        currentSchema={2}
        endpoint={'lote'}
        idItem={rowId}
        style={{ overflowY: 'scroll' }}
      >
                <AutoCompleteElement
          label='Produto'
          name='idProduto'
          options={produtos}
          required
        />

        <TextFieldElement
          label='Quantidade Inicial'
          name='quantidadeInicial'
          maskFunction={Masks.onlyNumbers}
          required
        />

        <TextFieldElement
          label='Quantidade Atual'
          name='quantidadeAtual'
          maskFunction={Masks.onlyNumbers}
          required
        />

        <DateElement
          label='Comprado em'
          name='compradoEm'
          required
        />

        <DateElement
          label='Validade'
          name='validade'
          required
        />

        <CurrencyFieldElement
          label='Custo'
          name='custo'
          maskFunction={Masks.currency}
          required
        />

        <CurrencyFieldElement
          label='Preço da venda'
          name='precoVenda'
          maskFunction={Masks.currency}
          required
        />

        <SelectFieldElement
          label='O produto está em promoção? *'
          name='emPromocao'
          options={[{ id: 1, name: 'Não', value: '0' }, { id: 2, name: 'Sim', value: '1' }]}
          required
        />

        <CurrencyFieldElement
          label='Preço da venda em promoção'
          name='precoVendaPromocao'
          maskFunction={Masks.currency}
          required
        />
      </SideBarFormEdit>
    </LayoutDashboard>
  );
}

export default Lote;