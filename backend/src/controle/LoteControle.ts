import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Lote from "../entidade/Lote";
import LoteServico from "../servico/LoteServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class LoteControle {
  private static servico = new LoteServico();

  async todos(_: CustomRequest<Lote>, res: Response): Promise<void> {
    const lotes = await LoteControle.servico.todos();
    res.status(201).json({ lotes });
  }

  porId(req: Request, res: Response): void {
    LoteControle.servico.porId(Number(req.params.id))
      .then((entidade) => {
        if (entidade == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json(entidade)
      });
  }

  async criar(req: CustomRequest<Lote>, res: Response): Promise<void> {
    try {
      const entidade = await LoteControle.servico.criar(req.body);
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

  async atualizar(req: CustomRequest<Lote>, res: Response): Promise<void> {
    try {
      const entidade = await LoteControle.servico.atualizar(req.body);
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
    LoteControle.servico.remover(Number(req.params.id))
      .then((lote) => { res.status(200).json({ lote }) });
  }
}

export default LoteControle;
