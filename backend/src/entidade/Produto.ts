type Produto = {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
  idBodega: number | null;
  idCriador: number | null;
  idCategoriaProduto: number | null;
}

export default Produto;
