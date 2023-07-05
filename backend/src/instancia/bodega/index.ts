import Inicializador from "../../base/arquitetura/Inicializador";

const PORTA = process.env.PORT;

const inicializadorBodega = new Inicializador();
inicializadorBodega.iniciar(PORTA);
