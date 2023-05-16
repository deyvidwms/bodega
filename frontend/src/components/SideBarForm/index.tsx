import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClient } from '../../schemas/validationSchema/Cliente';
import { validationSchemaProduct } from '../../schemas/validationSchema/Produto';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import { Button } from '@mui/material';

import { FormValues } from '../../types/FormValues';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FailedMessage, SuccessMessage } from '../../pages/Dashboard/Produto/styles';
import { validationSchemaLote } from '../../schemas/validationSchema/Lote';

type Props = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentSchema: number;
  endpoint?: string;
  style?: React.CSSProperties | undefined;
};

const validationSchemas = [
  validationSchemaClient,
  validationSchemaProduct,
  validationSchemaLote
];

const SideBarForm: React.FC<Props> = ({ title, children, show, setShow, currentSchema, endpoint, style }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemas[currentSchema])
  });

  const handleClickCancel = () => {
    methods.reset()
    setShow(false);
  }

  const onSubmitHandler = (values: FormValues) => {

    if (endpoint === 'lote') {
      values['idCriador'] = 1;
      const validadeSplited = values.validade.split('/');
      values.validade = new Date(`${validadeSplited[2]}-${validadeSplited[1]}-${validadeSplited[0]}`).toISOString();
      const compradoEmSplited = values.compradoEm.split('/');
      values.compradoEm = new Date(`${compradoEmSplited[2]}-${compradoEmSplited[1]}-${compradoEmSplited[0]}`).toISOString();
      values.emPromocao = values.emPromocao === '1';
    }

    if (endpoint === 'produto') {
      values['idCriador'] = 1;
      values['idBodega'] = 1;
    }

    if (values?.imagem) {
      if (Object.keys(values.imagem).length === 0)
        values.imagem = 'imagem.jpg';
    }

    fetch(`http://127.0.0.1:3000/${endpoint}`, {
      method: 'POST',
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
    if (success === true) {
      setTimeout(() => {
        methods.reset()
        setShow(false);
        setTimeout(() => {
          // window.location.reload();
        }, 300)
      }, 3000)
    }
  }, [success]);

  useEffect(() => {
    if (failed === true) {
      setTimeout(() => {
        setFailed(false);
      }, 3000);
    }
  }, [failed]);

  console.log(methods.formState.errors)

  return (
    <Container show={show} style={style}>
      { (!success && !failed) && <Title>Cadastro de {title}</Title>}
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
                Cadastrar
              </Button>
            </ButtonsList>
          </FormProvider>
        </ProductRegisterForm>
      }
      {
        success &&
        <SuccessMessage>
          <FaCheckCircle />
          <p><span>{title.substring(0, title.length - 1)}</span> cadastrado com sucesso!</p>
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

export default SideBarForm;