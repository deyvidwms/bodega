import * as yup from "yup";

const validateName = (value: string | undefined) => {
  if (value === undefined || value.length <= 0) return true;
  let namesSizesBiggerThanThree = value
    .split(" ")
    .filter((element: string) => element.length >= 3);
  return namesSizesBiggerThanThree.length >= 2;
};

export const validationSchemaClient = yup
  .object()
  .shape({
    nome: yup
      .string()
      .required("O campo acima é obrigatório")
      .test("fullName", "Você deve digitar o nome completo", (value) =>
        validateName(value)
      ),
    cpf: yup
      .string()
      .min(14, "O CPF deve ser preenchido corretamente")
      .required("O campo acima é obrigatório"),
    celular: yup
      .string()
      .min(15, "Digite um número de celular válido")
      .required("Preencha o campo corretamente"),
  })
  .required();

export const validationSchemaClientEdit = yup
  .object()
  .shape({
    nome: yup
      .string()
      .required("O campo acima é obrigatório")
      .test("fullName", "Você deve digitar o nome completo", (value) =>
        validateName(value)
      ),
    cpf: yup
      .string()
      .min(14, "O CPF deve ser preenchido corretamente")
      .required("O campo acima é obrigatório"),
    celular: yup
      .string()
      .min(15, "Digite um número de celular válido")
      .required("Preencha o campo corretamente"),
    saldoDevedor: yup
      .string()
      .required("Preencha o campo corretamente")
  })
  .required();
