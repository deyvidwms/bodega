import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Bodega from "../entidade/Bodega";
import BodegaServico from "../servico/BodegaServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class BodegaControle {
  private static servico = new BodegaServico();

  async todos(_: CustomRequest<Bodega>, res: Response): Promise<void> {
    const bodegas = await BodegaControle.servico.todos();
    res.status(201).json(bodegas == null ? [] : bodegas);
  }

  async porId(req: Request, res: Response): Promise<void> {
    const bodega = BodegaControle.servico.porId(Number(req.params.id));
    if (bodega == null) {
      res.status(404).send();
      return;
    }

    res.status(201).json({ bodega });
  }

  async criar(req: CustomRequest<Bodega>, res: Response): Promise<void> {
    try {
      const bodega = await BodegaControle.servico.criar(req.body);
      res.status(201).json({ bodega });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async atualizar(req: CustomRequest<Bodega>, res: Response): Promise<void> {
    try {
      const bodega = await BodegaControle.servico.atualizar(req.body);
      res.status(201).json({ bodega });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async remover(req: Request, res: Response): Promise<void> {
    try {
      const bodega = await BodegaControle.servico.remover(Number(req.params.id));
      res.status(201).json({ bodega });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async encarte(req: Request, res: Response): Promise<void> {
    const encarte = await BodegaControle.servico.encarte(Number(req.params.id));
    if (encarte == null) {
      res.status(404).send();
      return;
    }

    res.status(201).json({ encarte });
  }

  async relatorioFinanceiro(req: Request, res: Response): Promise<void> {
    const relatorioFinanceiro = await BodegaControle.servico.relatorioFinanceiro(req.body.inicio, req.body.fim)
    res.status(200).json({ relatorioFinanceiro })
  }
}

export default BodegaControle;
