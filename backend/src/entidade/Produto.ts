interface Produto {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idComercio: number | null;
  idCriador: number | null;
  idCategoriaProduto: number | null;
}

export default Produto;
