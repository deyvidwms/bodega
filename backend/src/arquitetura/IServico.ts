export default interface IServico<T> {
  validar(entidade: T): void;
}
