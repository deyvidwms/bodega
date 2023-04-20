import Bodega from "./Bodega";
import Pessoa from "./Pessoa";

type Usuario = {
  id: number;
  email: string;
  senha: string;
  pessoa: Pessoa | null;
  bodega: Bodega | null;
}

export default Usuario;
