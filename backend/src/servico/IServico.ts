export default interface IServico<T> {
  validar(entidade: T): ErroNegocio | undefined;
}
