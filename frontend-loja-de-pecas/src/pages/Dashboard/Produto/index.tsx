import React, { useEffect, useState } from 'react';
import LayoutDashboard from '../../../components/LayoutDashboard';

import BreadCrumb from '../../../components/BreadCrumb';
import Row from '../../../components/Row';
import Column from '../../../components/Column';

import { Container, Title } from './styles';
import TableElement from '../../../components/TableElement';
import ActionButton from '../../../components/ActionButton';
import SideBarForm from '../../../components/SideBarForm';
import TextFieldElement from '../../../components/TextFieldElement';
import { Masks } from '../../../assets/ts/Masks';
import FileFieldElement from '../../../components/FileFieldElement';
import AutoCompleteElement from '../../../components/AutoCompleteElement';
import SideBarFormEdit from '../../../components/SideBarFormEdit';

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idCategoriaProduto: number;
}

type CategoriaProduto = {
  id: number;
  nome: string; 
  imagem: string;
}

const Produto: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);
  const [showSideBarFormEdit, setShowSideBarFormEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<Produto[]>([]);
  const [rowId, setRowId] = useState<number>(0);
  const [categorias, setCategorias] = useState<CategoriaProduto[]>([]);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Produto',
      link: '/dashboard/produto'
    }
  ];

  const handleClick = () => {
    setShowSideBarForm(!showSideBarForm);
  }

  useEffect(() => {
    const getProducts = () => {
      fetch('http://127.0.0.1:3000/produto')
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error(error))
    };

    const setProducts = (data: any) => {
      const response: Produto[] = [];
      data.forEach( (element: Produto) => response.push(element) );
      setRows(response)
    };

    const getProductCategories = () => {
      fetch('http://127.0.0.1:3000/categoria-produto')
        .then(response => response.json())
        .then(data => setProductCategories(data))
        .catch(error => console.error(error))
    };

    const setProductCategories = (data: any) => {
      const response: CategoriaProduto[] = [];
      data.forEach( (element: CategoriaProduto) => response.push(element) );
      setCategorias(response)
    }

    getProducts();
    getProductCategories();
  }, []);

  const editProduct = (id: number) => {
    setRowId(id);
    setShowSideBarFormEdit(true);
  }

  const deleteProduct = (id: number) => {
    fetch(`http://127.0.0.1:3000/produto/${id}`, {
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
        <div style={{background: '#000'}}></div>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Produtos</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{alignItems: 'flex-end'}}>
            <ActionButton text='Adicionar produto' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement 
              header={['nome', 'descrição']} 
              rowsField={['titulo', 'descricao']} 
              rows={rows} 
              tableItemName='Produtos'
              handleEdit={editProduct}
              handleDelete={deleteProduct}  
            />
          </Column>
        </Row>
      </Container>
      <SideBarForm 
        title='Produtos' 
        show={showSideBarForm}
        setShow={setShowSideBarForm}  
        currentSchema={1}
        endpoint={'produto'}
      >
        <TextFieldElement 
          label='Nome'
          name='titulo'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />

        <TextFieldElement 
          label='Descrição'
          name='descricao'
          required
        />

        <AutoCompleteElement
          label='Categoria'
          name='idCategoriaProduto'
          options={categorias}
          required
        />

        <FileFieldElement
          label='Imagem'
          name='imagem'
          required
        />

      </SideBarForm>

      <SideBarFormEdit 
        title='produtos' 
        show={showSideBarFormEdit}
        setShow={setShowSideBarFormEdit}
        currentSchema={1}
        endpoint={'produto'}
        idItem={rowId}
      >
        <TextFieldElement 
          label='Nome'
          name='titulo'
          maskFunction={Masks.onlyLettersAndSpaces}
          required
        />

        <TextFieldElement 
          label='Descrição'
          name='descricao'
          required
        />

        <AutoCompleteElement
          label='Categoria'
          name='idCategoriaProduto'
          options={categorias}
          required
        />

        <FileFieldElement
          label='Imagem'
          name='imagem'
          required
        />
      </SideBarFormEdit>
    </LayoutDashboard>
  );
}

export default Produto;