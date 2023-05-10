import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClient } from '../../schemas/validationSchema/Cliente';
import { validationSchemaProduct } from '../../schemas/validationSchema/Produto';

import { ButtonsList, Container, ProductRegisterForm, Title } from './styles';
import { Button } from '@mui/material';

import { FormValues } from '../../types/FormValues';
import { FaCheckCircle } from 'react-icons/fa';
import { SuccessMessage } from '../../pages/Dashboard/Produto/styles';

type Props = {
  title: string;
  children: React.ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentSchema: number;
  endpoint?: string;
};

const validationSchemas = [
  validationSchemaClient,
  validationSchemaProduct
];

const SideBarForm: React.FC<Props> = ({ title, children, show, setShow, currentSchema, endpoint }) => {
  const [success, setSuccess] = useState<boolean>(false);

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemas[currentSchema])
  });

  const handleClickCancel = () => {
    methods.reset()
    setShow(false);
  }

  const onSubmitHandler = (values: FormValues) => {
    if (endpoint === 'produto') {
      values['idCriador'] = 1;
      values['idBodega'] = 1;
    }

    if (values?.imagem) {
      if (Object.keys(values.imagem).length === 0)
        values.imagem = 'imagem.jpg';
    }

    console.log("valores", values);
    fetch(`http://127.0.0.1:3000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => (
        setSuccess(true)
      ))
      .catch(error => console.error(error))
  };

  useEffect(() => {
    if (success === true) {
      methods.reset()
      setShow(false);
      setTimeout(() => {
        window.location.reload();
      }, 300)
    }
  }, [success]);

  // console.log(methods.formState.errors)

  return (
    <Container show={show}>
      {!success && <Title>Cadastro de {title}</Title>}
      {
        !success &&
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
                onClick={() => console.log('clicou')}
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
    </Container>
  );
}

export default SideBarForm;