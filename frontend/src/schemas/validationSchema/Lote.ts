import * as yup from "yup";

export const validationSchemaLote = yup
  .object()
  .shape({
    idProduto: yup
      .string()
      .required('O campo acima é obrigatorio'),
    quantidadeInicial: yup
      .string()
      .required("O campo acima é obrigatório"),
    quantidadeAtual: yup
      .string()
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
    compradoEm: yup
      .string()
      .required("O campo acima é obrigatório")
    // .test(
    //   "invalidFormat",
    //   "O campo acima deve estar no formato dd/mm/yyyy",
    //   (value) => dayjs(value).format("DD/MM/YYYY").length === 10
    // )
    ,
    custo: yup
      .string()
      .required("O campo acima é obrigatório"),
      precoVenda: yup
      .string()
      .required("O campo acima é obrigatório"),
    precoVendaPromocao: yup
      .string()
      .required("O campo acima é obrigatório")
  })
  .required();

export const validationSchemaLoteEdit = yup
.object()
.shape({
  idProduto: yup
    .string()
    .required('O campo acima é obrigatorio'),
  quantidadeInicial: yup
    .string()
    .required("O campo acima é obrigatório"),
  quantidadeAtual: yup
    .string()
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
  compradoEm: yup
    .string()
    .required("O campo acima é obrigatório")
  // .test(
  //   "invalidFormat",
  //   "O campo acima deve estar no formato dd/mm/yyyy",
  //   (value) => dayjs(value).format("DD/MM/YYYY").length === 10
  // )
  ,
  custo: yup
    .string()
    .required("O campo acima é obrigatório"),
    precoVenda: yup
    .string()
    .required("O campo acima é obrigatório"),
  precoVendaPromocao: yup
    .string()
    .required("O campo acima é obrigatório")
})
.required();
