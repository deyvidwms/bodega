import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Produto from "../entidade/Produto";
import ProdutoServico from "../servico/ProdutoServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class ProdutoControle {
  private static servico = new ProdutoServico();

  async todos(_: CustomRequest<Produto>, res: Response): Promise<void> {
    const produtos = await ProdutoControle.servico.todos();
    res.status(201).json({ produtos });
  }

  async porId(req: Request, res: Response): Promise<void> {
    ProdutoControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json(entidade)
      });
  }

  async criar(req: CustomRequest<Produto>, res: Response): Promise<void> {
    try {
      const entidade = await ProdutoControle.servico.criar(req.body);
      res.status(201).json(entidade);
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() });
        return;
      }
      console.log(e)
      res.status(400).json({
        erros: ['Houve um erro ao processar a sua requisição']
      });
    }
  }

  async atualizar(req: CustomRequest<Produto>, res: Response): Promise<void> {
    try {
      const entidade = await ProdutoControle.servico.atualizar(req.body);
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
    ProdutoControle.servico.remover(Number(req.params.id))
      .then((produto) => { res.status(200).json({ produto }) });
  }

  async produtosComBaixoEstoque(req: Request, res: Response): Promise<void> {
    ProdutoControle.servico.produtosComBaixoEstoque(Number(req.params.limite))
      .then((response) => res.status(200).json({ produtos: response }))
      .catch(() => res.status(200).json({ produtos: [] }));
  }
}

export default ProdutoControle;
