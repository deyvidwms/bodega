import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import CategoriaProduto from "../entidade/CategoriaProduto";
import CategoriaProdutoServico from "../servico/CategoriaProdutoServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class CategoriaProdutoControle {
  private static servico = new CategoriaProdutoServico();

  async todos(_: CustomRequest<CategoriaProduto>, res: Response): Promise<void> {
    const categoriasProdutos = await CategoriaProdutoControle.servico.todos();
    res.status(201).json({ categoriasProdutos });
  }

  async porId(req: Request, res: Response): Promise<void> {
    CategoriaProdutoControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ entidade })
      });
  }

  async criar(req: CustomRequest<CategoriaProduto>, res: Response): Promise<void> {
    try {
      const entidade = await CategoriaProdutoControle.servico.criar(req.body);
      res.status(201).json(entidade);
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() });
        return;
      }
      res.status(400).json({
        erros: ['Houve um erro ao processar a sua requisição']
      });
    }
  }

  async atualizar(req: CustomRequest<CategoriaProduto>, res: Response): Promise<void> {
    try {
      const entidade = await CategoriaProdutoControle.servico.atualizar(req.body);
      res.status(201).json(entidade);
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() });
        return;
      }
      res.status(400).json({
        erros: ['Houve um erro ao processar a sua requisição']
      });
    }
  }

  async remover(req: Request, res: Response): Promise<void> {
    CategoriaProdutoControle.servico.remover(Number(req.params.id))
      .then((categoriaProduto) => { res.status(200).json({ categoriaProduto }) });
  }
}

export default CategoriaProdutoControle;