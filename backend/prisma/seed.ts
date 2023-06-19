import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const pessoasList = [
  {
    nome: "João da Silva",
    cpf: "105.497.540-08",
    celular: "(11) 99999-9999"
  },
  {
    nome: "Maria Oliveira",
    cpf: "434.012.120-79",
    celular: "(11) 99999-9998"
  },
  {
    nome: "Pedro Santos",
    cpf: "690.128.200-14",
    celular: "(11) 99999-9997"
  },
  {
    nome: "Ana Souza",
    cpf: "735.704.120-40",
    celular: "(11) 99999-9996"
  },
  {
    nome: "Lucas Almeida",
    cpf: "898.026.400-34",
    celular: "(11) 99999-9995"
  },
  {
    nome: "Carla Ferreira",
    cpf: "476.551.840-03",
    celular: "(11) 99999-9994"
  },
  {
    nome: "Paulo Ribeiro",
    cpf: "404.249.170-76",
    celular: "(11) 99999-9993"
  },
  {
    nome: "Isabela Nogueira",
    cpf: "039.614.080-74",
    celular: "(11) 99999-9992"
  },
  {
    nome: "Maurício Costa",
    cpf: "971.942.850-37",
    celular: "(11) 99999-9991"
  },
  {
    nome: "Camila Silva",
    cpf: "063.683.460-35",
    celular: "(11) 99999-9990"
  }
];

const categoriaProdutoList = [
  {
    nome: "Hortifruti",
    imagem: '',
  },
  {
    nome: "Carnes",
    imagem: '',
  },
  {
    nome: "Peixes e frutos do mar",
    imagem: '',
  },
  {
    nome: "Laticínios",
    imagem: '',
  },
  {
    nome: "Açougue",
    imagem: '',
  },
  {
    nome: "Frios e embutidos",
    imagem: '',
  },
  {
    nome: "Bebidas",
    imagem: '',
  },
  {
    nome: "Doces e sobremesas",
    imagem: '',
  },
  {
    nome: "Padaria",
    imagem: '',
  },
  {
    nome: "Mercearia",
    imagem: '',
  },
  {
    nome: "Congelados",
    imagem: '',
  },
  {
    nome: "Limpeza e Higiene",
    imagem: '',
  },
  {
    nome: "Cuidados Pessoais",
    imagem: '',
  },
  {
    nome: "Pet Shop",
    imagem: '',
  },
  {
    nome: "Utilidades Domésticas",
    imagem: '',
  },
  {
    nome: "Bebês e Crianças",
    imagem: '',
  },
  {
    nome: "Biscoitos e Snacks",
    imagem: '',
  },
  {
    nome: "Cereais e Grãos",
    imagem: '',
  },
  {
    nome: "Chocolates e Doces",
    imagem: '',
  },
  {
    nome: "Enlatados e Conservas",
    imagem: '',
  },
  {
    nome: "Frios e Embutidos",
    imagem: '',
  },
  {
    nome: "Higiene Pessoal",
    imagem: '',
  },
  {
    nome: "Higiene e Limpeza Doméstica",
    imagem: '',
  },
  {
    nome: "Higiene Oral",
    imagem: '',
  },
  {
    nome: "Massas e Molhos",
    imagem: '',
  },
  {
    nome: "Papelaria",
    imagem: '',
  },
  {
    nome: "Produtos de Limpeza",
    imagem: '',
  },
  {
    nome: "Produtos Naturais e Orgânicos",
    imagem: '',
  },


];

const produtosList = [
  {
    titulo: "Arroz branco",
    descricao: "Arroz branco tipo 1, 1kg",
    imagem: "https://www.camil.com.br/wp-content/uploads/sites/12/2020/06/arroz-branco-camil-t1-1kg-768x768.jpg",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Feijão carioca",
    descricao: "Feijão carioca tipo 1, 1kg",
    imagem: "https://tezeio.vtexassets.com/arquivos/ids/680929/7896116900029_1_1.jpg?v=638127407171700000",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Leite integral",
    descricao: "Leite integral em caixa, 1L",
    imagem: "https://samsclub.vtexassets.com/arquivos/ids/157217/Manteiga-com-Sal-Itacolomy-500g.jpg?v=1769979502",
    idComercio: 1,
    idCategoriaProduto: 4,
    idCriador: 1
  },
  {
    titulo: "Pão de forma",
    descricao: "Pão de forma integral, 500g",
    imagem: "data:image/jpeg;base64,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",
    idComercio: 1,
    idCategoriaProduto: 9,
    idCriador: 1
  },
  {
    titulo: "Óleo de soja",
    descricao: "Óleo de soja refinado, 900ml",
    imagem: "https://diafoodservice.agilecdn.com.br/9575_1.jpg",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },

  {
    titulo: "Maçã",
    descricao: "Maçãs frescas e suculentas",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Tomate",
    descricao: "Tomates vermelhos e maduros",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Alface",
    descricao: "Alfaces frescas e crocantes",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 1,
    idCriador: 1
  },
  {
    titulo: "Filé Mignon",
    descricao: "Filé mignon suculento e macio",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 2,
    idCriador: 1
  },
  {
    titulo: "Frango",
    descricao: "Cortes de frango frescos e de qualidade",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 2,
    idCriador: 1
  },
  {
    titulo: "Costela de Porco",
    descricao: "Costelas de porco saborosas e suculentas",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 2,
    idCriador: 1
  },
  {
    titulo: "Salmão Fresco",
    descricao: "Salmão fresco e suculento",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 3,
    idCriador: 1
  },
  {
    titulo: "Camarão",
    descricao: "Camarões grandes e saborosos",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 3,
    idCriador: 1
  },
  {
    titulo: "Lula",
    descricao: "Lulas frescas e tenras",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 3,
    idCriador: 1
  },
  {
    titulo: "Queijo Minas",
    descricao: "Queijo Minas fresco e macio",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 4,
    idCriador: 1
  },
  {
    titulo: "Iogurte Natural",
    descricao: "Iogurte natural cremoso e saudável",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 4,
    idCriador: 1
  },
  {
    titulo: "Pão Francês",
    descricao: "Pães franceses frescos e crocantes",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 5,
    idCriador: 1
  },
  {
    titulo: "Bolo de Chocolate",
    descricao: "Bolo de chocolate macio e delicioso",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 8,
    idCriador: 1
  },
  {
    titulo: "Croissant",
    descricao: "Croissants folhados e saborosos",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 8,
    idCriador: 1
  },
  {
    titulo: "Refrigerante",
    descricao: "Refrigerante de cola refrescante",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 7,
    idCriador: 1
  },
  {
    titulo: "Suco de Laranja",
    descricao: "Suco de laranja natural e nutritivo",
    imagem: "",
    idComercio: 1,
    idCategoriaProduto: 7,
    idCriador: 1
  },
];

async function cadastrarCategoriasProdutos() {
  categoriaProdutoList.forEach((categoriaProduto) => (
    prisma.categoriaProduto.create({ data: categoriaProduto }).catch(error => console.log('error:', error))
  ))
  return true;
}

async function cadastrarProdutos() {
  produtosList.forEach((produto) => (prisma.produto.create({ data: produto }).catch(error => console.log('error:', error))));
}

async function cadastrarPessoas() {
  pessoasList.forEach((pessoa) => (prisma.pessoa.create({ data: pessoa }).catch(error => console.log('error:', error))));
}

async function main() {
  // cria um comercio
  prisma.comercio.create({
    data: {
      nome: 'Comércio do Alpha',
      descricao: 'Melhor comércio do mundo',
      cnpj: '14.549.348/0001-47',
      imagem: 'logo-comercio.jpg'
    }
  })
    .then(cadastrarCategoriasProdutos)
    .then(cadastrarPessoas)
    .then(() => {
      prisma.usuario.create({
        data: {
          email: 'email@dominio.com',
          senha: '202cb962ac59075b964b07152d234b70', // 123
          idComercio: 1,
          idPessoa: 1
        }
      }).catch(error => console.log('error:', error))
    })
    .then(cadastrarProdutos)
    .then(() => {
      pessoasList.forEach(async (element, index: number) => {
        if (index > 0) {
          prisma.clienteComercio.create({ data: { idComercio: 1, idCliente: 1, } }).catch(error => console.log('error:', error))
        }
      })
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 10,
          quantidadeAtual: 9,
          validade: '2023-05-24T18:25:43.511Z',
          compradoEm: '2023-04-08T18:25:43.511Z',
          custo: 10.00,
          precoVenda: 15.00,
          precoVendaPromocao: 0.00,
          emPromocao: false,
          idCriador: 1,
          idProduto: 1
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 15,
          quantidadeAtual: 9,
          validade: '2023-08-24T18:25:43.511Z',
          compradoEm: '2023-05-08T18:25:43.511Z',
          custo: 8.00,
          precoVenda: 15.00,
          precoVendaPromocao: 12.00,
          emPromocao: true,
          idCriador: 1,
          idProduto: 2
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.lote.create({
        data: {
          quantidadeInicial: 15,
          quantidadeAtual: 9,
          validade: '2023-06-24T18:25:43.511Z',
          compradoEm: '2023-05-08T18:25:43.511Z',
          custo: 5.00,
          precoVenda: 20.00,
          precoVendaPromocao: 15.00,
          emPromocao: true,
          idCriador: 1,
          idProduto: 3
        }
      }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.venda.create({ data: { vendidoEm: '2023-04-09T18:25:43.511Z' } }).catch(error => console.log('error:', error))
    })
    .then(() => {
      prisma.vendaLote.create({
        data: {
          quantidade: 1,
          idLote: 1,
          idVenda: 1
        }
      }).catch(error => console.log('error:', error))
    })
    .catch(error => console.log('error', error));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
