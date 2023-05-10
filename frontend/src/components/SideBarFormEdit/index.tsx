import React, { useEffect, useState } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClientEdit } from '../../schemas/validationSchema/Cliente';
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
  endpoint: string;
  idItem: number;
};

const validationSchemas = [
  validationSchemaClientEdit,
  validationSchemaProduct
];

const SideBarFormEdit: React.FC<Props> = ({ title, children, show, setShow, currentSchema, endpoint, idItem }) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<{ [key: string]: any }>({});

  const methods = useForm<FormValues>({
    resolver: yupResolver(validationSchemas[currentSchema]),
  });

  const handleClickCancel = () => {
    methods.reset()
    setShow(false);
  }

  const onSubmitHandler = (values: FormValues) => {
    // console.log("valores", values);
    fetch(`http://127.0.0.1:3000/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => (
        setSuccess(true)
      ))
      // .then(data => console.log('data', data))
      .catch(error => console.error(error))
  };

  useEffect(() => {
    const getItem = async (id: number) => {
      if (id > 0)
        return await fetch(`http://127.0.0.1:3000/${endpoint}/${id}`)
          .then(response => response.json())
          .then(data => setDefaultValues(data))
          .catch(error => { })
      return setDefaultValues({});
    }

    getItem(idItem)
  }, [idItem]);

  useEffect(() => {
    if (success === true) {
      methods.reset()
      setShow(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000)
    }
  }, [success]);

  useEffect(() => {
    // console.log('default', defaultValues)
    defaultValues['endereco'] = '';
    methods.reset(defaultValues[endpoint]);
  }, [defaultValues])

  // console.log('values', methods.getValues())
  // console.log('errors', methods.formState.errors)

  return (
    <Container show={show}>
      {!success && <Title>Edição de {title}</Title>}
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
    </Container>
  );
}

export default SideBarFormEdit;