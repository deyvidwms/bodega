import dayjs from "dayjs";
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
      .required("O campo acima é obrigatório")
      .test('lassThenInitialQuantity', 'A quantidade atual deve ser igual ou menor que a inicial', (value, context) => value <= context.parent.quantidadeInicial),
    validade: yup
      .string()
      .required("O campo acima é obrigatório")
      .test(
        "invalidFormat",
        "O campo acima deve estar no formato dd/mm/yyyy",
        (value) => value.length === 10
      )
      .test(
        "invalidDate",
        "Digite uma data válida",
        (value) => {
          const tmpDate = value.split('/');
          const dia = tmpDate[0];
          const mes = tmpDate[1];
          const ano = tmpDate[2];

          return !isNaN(new Date(`${ano}-${mes}-${dia}`).getTime());
        }
      )
      .test(
        "expiredDate",
        "O produto está vencido, não pode ser cadastrado",
        (value) => {
          const tmpDate = value.split('/');
          const dia = tmpDate[0];
          const mes = tmpDate[1];
          const ano = tmpDate[2];

          return new Date(`${ano}-${mes}-${dia}`) > new Date();
        }
      ),
    compradoEm: yup
      .string()
      .required("O campo acima é obrigatório")
      .test(
        "invalidFormat",
        "O campo acima deve estar no formato dd/mm/yyyy",
        (value) => value.length === 10
      )
      .test(
        "invalidDate",
        "Digite uma data válida",
        (value) => {
          const tmpDate = value.split('/');
          const dia = tmpDate[0];
          const mes = tmpDate[1];
          const ano = tmpDate[2];

          return !isNaN(new Date(`${ano}-${mes}-${dia}`).getTime());
        }
      )
      .test(
        "invalidDateTwo",
        "Data maior que a atual",
        (value) => {
          const tmpDate = value.split('/');
          const dia = tmpDate[0];
          const mes = tmpDate[1];
          const ano = tmpDate[2];

          return new Date(`${ano}-${mes}-${dia}`) <= new Date();
        }
      ),
    custo: yup
      .string()
      .required("O campo acima é obrigatório")
      .test(
        "invalidValue",
        "O valor deve ser maior que 0",
        (value) => Number(value.replaceAll('.','').replaceAll(',','.')) > 0
      ),
    precoVenda: yup
      .string()
      .required("O campo acima é obrigatório")
      .test(
        "invalidValue",
        "O valor deve ser maior que 0",
        (value) => Number(value.replaceAll('.','').replaceAll(',','.')) > 0
      ),
    emPromocao: yup
      .string()
      .required("Selecione uma opção válida"),
    precoVendaPromocao: yup
      .string()
      .test(
        "requiredValue",
        "O campo acima é obrigatório",
        (value, context) => {
          return context.parent.emPromocao === '0' || value !== undefined && value?.length > 0
        }
      )
      .test(
        "invalidValue",
        "O valor deve ser maior que 0",
        (value, context) => context.parent.emPromocao === '0' || ( value !== undefined && Number(value.replaceAll('.','').replaceAll(',','.')) > 0 )
      ),
  })
  .required();