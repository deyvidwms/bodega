import React, { useEffect, useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClient } from '../../schemas/validationSchema/Cliente';

import {
  Container,
  HeaderEncarte,
  ContentEncarte,
  Subtitle,
  Title,
  CategoryEncarte,
  CategoryTitle,
  CategoryListItens,
  ProductItem,
  FooterEncarte,
  RegisterClientForm,
  RegisterClientFormContent,
  RegisterClientFormFooter,
  ProductImage,
  ProductName,
  ProductPrice,
  TitleMobile,
  SuccessMessage
} from './styles';
import TextFieldElement from '../../components/TextFieldElement';

import { Masks } from '../../assets/ts/Masks';

import { FormValues } from '../../types/FormValues';
import { Button, Divider } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';

type Lote = {
  id: number,
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

type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idComercio: number | null;
  idCriador: number | null;
  idCategoriaProduto: number | null;
  lotes: Lote[];
};

type CategoriaProduto = {
  id: number;
  nome: string;
  imagem: string;
};

const Encarte: React.FC = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const idComercio = 1;

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/comercio/encarte/${idComercio}`)
      .then((response) => response.json())
      .then((response) => { setProdutos(response); });
  }, [])
  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemaClient),
  });

  const onSubmitHandler = (values: FormValues) => {
    fetch(`http://127.0.0.1:3000/pessoa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => setSuccess(true))
      .catch(error => console.error(error))

  };

  return (
    <Container>
      <HeaderEncarte>
        <Subtitle>Novas Ofertas</Subtitle>
        <Divider sx={{ width: '60%', transform: 'translateY: (-60%)' }}>
          <Title>Super Store</Title>
        </Divider>
        <TitleMobile>Super Store</TitleMobile>
      </HeaderEncarte>

      <ContentEncarte>
        {
          (produtos.length === 0)
            ? <h3 style={{ maxWidth: '700px', textAlign: 'center', fontSize: '1.5rem', fontFamily: 'roboto' }}>
              No momento não temos produtos em promoção em nosso comércio, mas você pode voltar no futuro para ver as novas promoções.
            </h3>
            : produtos.map((produto: Produto) => (
              <CategoryEncarte key={produto.id}>
                <div style={{ width: '100%', margin: 'auto 10px' }}>
                  <CategoryTitle>{produto.titulo}</CategoryTitle>
                  <Divider sx={{ width: '80%', marginBottom: '15px' }} />
                </div>

                <CategoryListItens>
                  {
                    produto.lotes.map((lote: Lote) => {
                      const price = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(lote.precoVendaPromocao));
                      return <ProductItem key={lote.id}>
                        <ProductImage src={produto.imagem} />
                        <ProductName>{produto.titulo}</ProductName>
                        <ProductPrice>{price}</ProductPrice>
                      </ProductItem>
                    })
                  }
                </CategoryListItens>
              </CategoryEncarte>
            ))
        }
      </ContentEncarte>

      <FooterEncarte>
        {!success &&
          <FormProvider {...methods}>
            <RegisterClientForm
              noValidate
              autoComplete="off"
              onSubmit={methods.handleSubmit(onSubmitHandler)}
            >
              <h1>Quer ficar por dentro de nossas novidades?</h1>

              <RegisterClientFormContent>
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
                  label='WhatsApp'
                  name='celular'
                  maskFunction={Masks.cellPhoneNumber}
                  required
                />
              </RegisterClientFormContent>

              <RegisterClientFormFooter>
                <Button variant='contained' type='submit' color='success' sx={{ fontWeight: 'bold' }}>Quero receber novidades!</Button>
              </RegisterClientFormFooter>

            </RegisterClientForm>
          </FormProvider>
        }
        {
          success &&
          <SuccessMessage>
            <FaCheckCircle />
            <h1>Cadastro realizado com sucesso!</h1>
            <p>Em breve você irá receber nossas novidades!</p>
          </SuccessMessage>
        }
      </FooterEncarte>
    </Container>
  );
}

export default Encarte;