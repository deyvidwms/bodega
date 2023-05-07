import { Request, Response } from "express";
import CustomRequest from "../arquitetura/CustomRequest";
import Usuario from "../entidade/Usuario";
import UsuarioServico from "../servico/UsuarioServico";
import ErroNegocio from "../arquitetura/ErroNegocio";

class UsuarioControle {
  private static servico = new UsuarioServico();

  async todos(_: CustomRequest<Usuario>, res: Response): Promise<void> {
    const usuarios = await UsuarioControle.servico.todos();
    res.status(201).json(usuarios == null ? [] : usuarios);
  }

  porId(req: Request, res: Response): void {
    UsuarioControle.servico.porId(Number(req.params.id))
      .then((usuario) => {
        if (usuario == null) {
          res.status(404).send();
          return;
        }

        res.status(201).json({ usuario })
      });
  }

  async criar(req: CustomRequest<Usuario>, res: Response): Promise<void> {
    try {
      const usuario = await UsuarioControle.servico.criar(req.body);
      res.status(201).json({ usuario });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  async atualizar(req: CustomRequest<Usuario>, res: Response): Promise<void> {
    try {
      const usuario = await UsuarioControle.servico.atualizar(req.body);
      res.status(201).json({ usuario });
    } catch (e) {
      if (e instanceof ErroNegocio) {
        res.status(400).json({ erros: e.getErros() })
      }
    }
  }

  remover(req: Request, res: Response): void {
    UsuarioControle.servico.remover(Number(req.params.id))
      .then((usuario) => { res.status(200).json({ usuario }) });
  }
}

export default UsuarioControle;
