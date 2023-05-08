import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Venda from "../entidade/Venda";
import VendaServico from "../servico/VendaServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class VendaControle {
  private static servico = new VendaServico();

  async todos(_: CustomRequest<Venda>, res: Response): Promise<void> {
    const vendas = await VendaControle.servico.todos();
    res.status(201).json({ vendas });
  }

  async porId(req: Request, res: Response): Promise<void> {
    VendaControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ entidade })
      });
  }

  async criar(req: CustomRequest<Venda>, res: Response): Promise<void> {
    try {
      const entidade = await VendaControle.servico.criar(req.body);
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

  async atualizar(req: CustomRequest<Venda>, res: Response): Promise<void> {
    try {
      const entidade = await VendaControle.servico.atualizar(req.body);
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
    VendaControle.servico.remover(Number(req.params.id))
      .then((venda) => { res.status(200).json({ venda }) });
  }
}

export default VendaControle;
