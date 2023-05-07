import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoServico from "../servico/CategoriaProdutoServico";

class CategoriaProdutoControle {
  private static servico = new CategoriaProdutoServico();

  async todos(_: CustomRequest<CategoriaProduto>, res: Response): Promise<void> {
    const categoriasProdutos = await CategoriaProdutoControle.servico.todos();
    res.status(201).json(categoriasProdutos == null ? [] : categoriasProdutos);
  }

  porId(req: Request, res: Response): void {
    CategoriaProdutoControle.servico.porId(Number(req.params.id))
      .then((categoriaProduto) => {
        if (categoriaProduto == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ categoriaProduto })
      });
  }

  criar(req: CustomRequest<CategoriaProduto>, res: Response): void {
    CategoriaProdutoControle.servico.criar(req.body)
      .then((categoriaProduto) => { res.status(201).json({ categoriaProduto }) });
  }

  atualizar(req: CustomRequest<CategoriaProduto>, res: Response): void {
    CategoriaProdutoControle.servico.atualizar(req.body)
      .then((categoriaProduto) => { res.status(201).json({ categoriaProduto }) });
  }

  remover(req: Request, res: Response): void {
    CategoriaProdutoControle.servico.remover(Number(req.params.id))
      .then((categoriaProduto) => { res.status(200).json({ categoriaProduto }) });
  }
}

export default CategoriaProdutoControle;