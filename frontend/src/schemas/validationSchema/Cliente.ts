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
    nomeCompleto: yup
      .string()
      .required("O campo acima é obrigatório")
      .test("fullName", "Você deve digitar o nome completo", (value) =>
        validateName(value)
      ),
    apelido: yup
      .string()
      .min(3, "O campo acima deve ter no mínimo 3 caracteres")
      .max(30, "O campo acima deve ter no máximo 30 caracteres")
      .required("O campo acima é obrigatório"),
    cpf: yup
      .string()
      .min(14, "O CPF deve ser preenchido corretamente")
      .required("O campo acima é obrigatório"),
    celular: yup
      .string()
      .min(15, "Digite um número de celular válido")
      .required("Preencha o campo corretamente"),
  })
  .required()