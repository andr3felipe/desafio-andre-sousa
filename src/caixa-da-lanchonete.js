class CaixaDaLanchonete {
  cardapio = [
    { codigo: "cafe", descricao: "Café", valor: 300 },
    { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 150 },
    { codigo: "suco", descricao: "Suco Natural", valor: 620 },
    { codigo: "sanduiche", descricao: "Sanduíche", valor: 650 },
    { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 200 },
    { codigo: "salgado", descricao: "Salgado", valor: 725 },
    { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 950 },
    { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 750 },
  ];

  metodosDePagamento = { dinheiro: 0.95, credito: 1.03, debito: 1 };

  validarDados(metodoDePagamento, itens) {
    // verificar forma de pagamento
    if (!this.metodosDePagamento[metodoDePagamento]) {
      return { erro: "Forma de pagamento inválida!" };
    }

    // verificar se existem itens no carrinho
    if (itens?.length === 0) {
      return { erro: "Não há itens no carrinho de compra!" };
    }

    return null;
  }

  carrinho(metodoDePagamento, itens) {
    const carrinho = new Map();

    // verificar se os itens estão no cardápio e adicionar ao carrinho
    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      const verificarCardapio = this.cardapio.find(
        (item) => item.codigo === codigo
      );

      if (!verificarCardapio) {
        return { erro: "Item inválido!" };
      }
      if (!parseInt(quantidade) || parseInt(quantidade) <= 0) {
        return { erro: "Quantidade inválida!" };
      }
      if (!carrinho.has(codigo)) {
        carrinho.set(codigo, 0);
      }
      carrinho.set(codigo, carrinho.get(codigo) + parseInt(quantidade));
    }

    let valorTotal = 0;

    for (const itemCardapio of this.cardapio) {
      if (carrinho.has(itemCardapio.codigo)) {
        valorTotal += itemCardapio.valor * carrinho.get(itemCardapio.codigo);
      }
    }

    // Aplicar o desconto ou acrescimo
    valorTotal *= this.metodosDePagamento[metodoDePagamento];

    // Verificar regras de itens extras sem principal
    if (carrinho.has("chantily") && !carrinho.has("cafe")) {
      return { erro: "Item extra não pode ser pedido sem o principal" };
    }
    if (carrinho.has("queijo") && !carrinho.has("sanduiche")) {
      return { erro: "Item extra não pode ser pedido sem o principal" };
    }

    return { carrinho, valorTotal };
  }
  calcularValorDaCompra(metodoDePagamento, itens) {
    // se metodo de pagamento for inválido irá retornar um erro
    const validarDados = this.validarDados(metodoDePagamento, itens);

    if (validarDados) return validarDados.erro;

    // inicializando carrinho
    const carrinho = this.carrinho(metodoDePagamento, itens);

    // se algum item do pedido for inválido irá retornar um erro
    if (carrinho.erro) return carrinho.erro;

    // Formatando o valor total e retornando a resposta
    return `R$ ${(carrinho.valorTotal / 100).toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
