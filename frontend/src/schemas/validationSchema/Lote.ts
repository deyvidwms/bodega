import * as yup from "yup";

export const validationSchemaLote = yup
  .object()
  .shape({
    quantidade: yup
      .number()
      .required("O campo acima é obrigatório"),
    validade: yup
      .string()
      .required("O campo acima é obrigatório")
    // .test(
    // "invalidFormat",
    // "O campo acima deve estar no formato dd/mm/yyyy",
    // (value) => dayjs(value).format("DD/MM/YYYY").length === 10
    // )
    ,
    dataCompra: yup
      .string()
      .required("O campo acima é obrigatório")
    // .test(
    //   "invalidFormat",
    //   "O campo acima deve estar no formato dd/mm/yyyy",
    //   (value) => dayjs(value).format("DD/MM/YYYY").length === 10
    // )
    ,
    valorCompra: yup
      .number()
      .required("O campo acima é obrigatório"),
    valorVenda: yup
      .number()
      .required("O campo acima é obrigatório"),
  })
  .required();

export const validationSchemaLoteEdit = yup
  .object()
  .shape({
    quantidade: yup
      .number()
      .required("O campo acima é obrigatório"),
    validade: yup
      .string()
      .required("O campo acima é obrigatório")
    // .test(
    // "invalidFormat",
    // "O campo acima deve estar no formato dd/mm/yyyy",
    // (value) => dayjs(value).format("DD/MM/YYYY").length === 10
    // )
    ,
    dataCompra: yup
      .string()
      .required("O campo acima é obrigatório")
    // .test(
    //   "invalidFormat",
    //   "O campo acima deve estar no formato dd/mm/yyyy",
    //   (value) => dayjs(value).format("DD/MM/YYYY").length === 10
    // )
    ,
    valorCompra: yup
      .number()
      .required("O campo acima é obrigatório"),
    valorVenda: yup
      .number()
      .required("O campo acima é obrigatório"),
  })
  .required()
