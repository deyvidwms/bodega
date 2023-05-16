import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClientEdit } from '../../schemas/validationSchema/Cliente';
import { validationSchemaProductEdit } from '../../schemas/validationSchema/Produto';
import { validationSchemaLoteEdit } from '../../schemas/validationSchema/Lote';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import { Button } from '@mui/material';

import { FormValues } from '../../types/FormValues';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FailedMessage, SuccessMessage } from '../../pages/Dashboard/Produto/styles';

type Props = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentSchema: number;
  endpoint: string;
  idItem: number;
  style?: React.CSSProperties | undefined;
};

const validationSchemas = [
  validationSchemaClientEdit,
  validationSchemaProductEdit,
  validationSchemaLoteEdit
];

const SideBarFormEdit: React.FC<Props> = ({ title, children, show, setShow, currentSchema, endpoint, idItem, style }) => {
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

  const onSubmitHandler = (values: FormValues) => {
    if (values?.saldoDevedor) {
      values.saldoDevedor = Number(values.saldoDevedor.replaceAll('.','').replaceAll(',','.'))
    }

    if (values?.imagem) {
      if (Object.keys(values.imagem).length === 0)
        values.imagem = 'imagem.jpg';
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
        console.log(data)
        if (!data.erros) { 
          setSuccess(true) 
        } else {
          setFailed(true);
        }
      })
      .catch(error => console.error(error))
  };

  useEffect(() => {
    const getItem = async (id: number) => {
      if (id > 0)
        return await fetch(`http://127.0.0.1:3000/${endpoint}/${id}`)
          .then(response => response.json())
          .then(data => { setDefaultValues(data) })
          .catch(error => { console.log(error) })
      return setDefaultValues({});
    }

    getItem(idItem)
  }, [idItem]);

  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        methods.reset()
        setShow(false);
        setTimeout(() => {
          // window.location.reload();
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

    methods.reset(defaultValues);
  }, [defaultValues])

  useEffect(() => { console.log(methods.formState.errors) }, [methods.formState.errors])

  return (
    <Container show={show} style={style}>
      { (!success && !failed) && <Title>Edição de {title}</Title>}
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
              // onClick={() => console.log('clicou')}
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