import { Request, Response } from "express";
import CustomRequest from "../arquitetura/customRequest";
import Usuario from "../entidade/Usuario";
import UsuarioServico from "../servico/usuarioServico";

class UsuarioControle {
  private static servico = new UsuarioServico();

  todos(_: CustomRequest<Usuario>, res: Response): void {
    UsuarioControle.servico.todos()
      .then((response) => res.status(200).json({ usuarios: response }))
      .catch(() => res.status(200).json({ usuarios: [] }));
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

  criar(req: CustomRequest<Usuario>, res: Response): void {
    UsuarioControle.servico.criar(req.body)
      .then((usuario) => { res.status(201).json({ usuario }) });
  }

  atualizar(req: CustomRequest<Usuario>, res: Response): void {
    UsuarioControle.servico.atualizar(req.body)
      .then((usuario) => { res.status(201).json({ usuario }) });
  }

  remover(req: Request, res: Response): void {
    UsuarioControle.servico.remover(Number(req.params.id))
      .then((usuario) => { res.status(200).json({ usuario }) });
  }
}

export default UsuarioControle;