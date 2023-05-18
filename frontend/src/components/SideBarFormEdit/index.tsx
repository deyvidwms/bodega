import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClientEdit } from '../../schemas/validationSchema/Cliente';
import { validationSchemaProduct } from '../../schemas/validationSchema/Produto';
import { validationSchemaLote } from '../../schemas/validationSchema/Lote';
import { validationSchemaSellProduct } from '../../schemas/validationSchema/ProdutoVenda';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import { Button } from '@mui/material';

import { FormValues } from '../../types/FormValues';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FailedMessage, SuccessMessage } from '../../pages/Dashboard/Produto/styles';
import { Utils } from '../../assets/ts/Utils';

type Props = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentSchema: number;
  endpoint: string;
  idItem: number;
  rowItem?: any;
  rows?: any;
  setRows?: any;
  style?: React.CSSProperties | undefined;
};

const validationSchemas = [
  validationSchemaClientEdit,
  validationSchemaProduct,
  validationSchemaLote,
  validationSchemaSellProduct
];

const SideBarFormEdit: React.FC<Props> = ({ title, children, show, setShow, currentSchema, endpoint, idItem, rowItem, rows, setRows, style }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<{ [key: string]: any }>({});

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemas[currentSchema]),
  });

  const handleClickCancel = () => {
    methods.reset()
    setShow(false);
  }

  const onSubmitHandler = async (values: FormValues) => {

    if (rowItem !== undefined) {
      const indexLote = rows.findIndex((element: { id: number; nome: string; quantidade: number; validade: string; }) => element.id === idItem);
      if (indexLote > -1) {
        const tmpRows = rows;
        rowItem.id = Number(values.idLote);
        rowItem.quantidade = Number(values.quantidade);
        tmpRows[indexLote] = rowItem;
        setRows(tmpRows);
      }
    } else {
      if (endpoint === 'lote') {
        values['idCriador'] = 1;

        if (values?.idProduto)
          values.idProduto = Number(values.idProduto);

        if (values?.custo)
          values.custo = Number(values.custo.replaceAll('.', '').replaceAll(',', '.'));

        if (values?.precoVenda)
          values.precoVenda = Number(values.precoVenda.replaceAll('.', '').replaceAll(',', '.'));

        if (values?.precoVendaPromocao)
          values.precoVendaPromocao = Number(values.precoVendaPromocao.replaceAll('.', '').replaceAll(',', '.'));
        else
          values['precoVendaPromocao'] = 0;

        if (values?.quantidadeAtual)
          values.quantidadeAtual = Number(values.quantidadeAtual);

        if (values?.quantidadeInicial)
          values.quantidadeInicial = Number(values.quantidadeInicial);

        const validadeSplited = values.validade.split('/');
        values.validade = new Date(`${validadeSplited[2]}-${validadeSplited[1]}-${validadeSplited[0]}`).toISOString();
        const compradoEmSplited = values.compradoEm.split('/');
        values.compradoEm = new Date(`${compradoEmSplited[2]}-${compradoEmSplited[1]}-${compradoEmSplited[0]}`).toISOString();
        values.emPromocao = values.emPromocao === '1';
      }

      if (values?.saldoDevedor) {
        values.saldoDevedor = Number(values.saldoDevedor.replaceAll('.', '').replaceAll(',', '.'))
      }

      if (values?.imagem) {
        if (Object.keys(values.imagem).length === 0)
          values.imagem = await Utils.getBase64(values.imagem);
      }

      if (endpoint === 'produto') {
        if (values?.idCategoriaProduto) {
          values.idCategoriaProduto = Number(values.idCategoriaProduto);
        }
      }

      fetch(`http://127.0.0.1:3000/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
        .then(response => response.json())
        .then(data => {
          if (!data.erros) {
            setSuccess(true)
          } else {
            setFailed(true);
          }
        })
        .catch(error => console.error(error))
    }
  };

  useEffect(() => {
    if (rowItem !== undefined) {
      const tmpRow = {
        idLote: rowItem?.id,
        quantidade: rowItem?.quantidade
      }
      methods.reset(tmpRow);
    } else {
      const getItem = async (id: number) => {
        if (id > 0)
          return await fetch(`http://127.0.0.1:3000/${endpoint}/${id}`)
            .then(response => response.json())
            .then(data => { setDefaultValues(data) })
            .catch(error => { console.log(error) })
        return setDefaultValues({});
      }

      getItem(idItem)
    }
  }, [idItem]);

  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        methods.reset()
        setShow(false);
        setTimeout(() => {
          window.location.reload();
        }, 300)
      }, 3000);
    }
  }, [success]);

  useEffect(() => {
    if (failed === true) {
      setTimeout(() => {
        setFailed(false);
      }, 3000);
    }
  }, [failed]);

  useEffect(() => {
    if (defaultValues?.compradoEm) {
      const compradoEmSplited = defaultValues.compradoEm.split('T')[0].split('-');
      defaultValues.compradoEm = `${compradoEmSplited[2]}/${compradoEmSplited[1]}/${compradoEmSplited[0]}`;
    }

    if (defaultValues?.validade) {
      const validadeSplited = defaultValues.validade.split('T')[0].split('-');
      defaultValues.validade = `${validadeSplited[2]}/${validadeSplited[1]}/${validadeSplited[0]}`;
    }

    if (defaultValues?.saldoDevedor) {
      defaultValues.saldoDevedor = new Intl.NumberFormat("pt-BR").format(defaultValues.saldoDevedor);
    }

    if (defaultValues?.emPromocao !== undefined) {
      defaultValues.emPromocao = defaultValues.emPromocao ? '1' : '0';
    }

    if (defaultValues?.custo) {
      defaultValues.custo = new Intl.NumberFormat("pt-BR").format(defaultValues.custo);
    }

    if (defaultValues?.precoVenda) {
      defaultValues.precoVenda = new Intl.NumberFormat("pt-BR").format(defaultValues.precoVenda);
    }

    if (defaultValues?.precoVendaPromocao && defaultValues.precoVendaPromocao === '0') {
      defaultValues.precoVendaPromocao = '';
    } else if (defaultValues?.precoVendaPromocao && defaultValues.precoVendaPromocao === '0') {
      defaultValues.precoVendaPromocao = new Intl.NumberFormat("pt-BR").format(defaultValues.precoVendaPromocao);
    }

    methods.reset(defaultValues);
  }, [defaultValues])

  return (
    <Container show={show} style={style}>
      {(!success && !failed) && <Title>Edição de {title}</Title>}
      {
        (!success && !failed) &&
        <ProductRegisterForm
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <FormProvider {...methods}>
            {children}

            <ButtonsList>
              <Button
                variant="outlined"
                sx={{ color: '#999', borderColor: '#999' }}
                onClick={handleClickCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                type='submit'
              >
                Editar
              </Button>
            </ButtonsList>
          </FormProvider>
        </ProductRegisterForm>
      }
      {
        success &&
        <SuccessMessage>
          <FaCheckCircle />
          <p><span>{title.substring(0, title.length - 1)}</span> editado com sucesso!</p>
        </SuccessMessage>
      }
      {
        failed &&
        <FailedMessage>
          <FaTimesCircle />
          <p>Falha ao cadastrar informação!</p>
          <p>Confira os dados e tente novamente.</p>
        </FailedMessage>
      }
    </Container>
  );
}

export default SideBarFormEdit;