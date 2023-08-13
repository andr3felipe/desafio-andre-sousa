import { Cardapio } from "./cardapio.js";

class CaixaDaLanchonete {
  #metodosDePagamento = { dinheiro: 0.95, credito: 1.03, debito: 1 };

  getMetodosDePagamento() {
    return this.#metodosDePagamento;
  }

  validarDados(metodoDePagamento, itens) {
    const metodosDePagamento = this.getMetodosDePagamento();
    // verificar forma de pagamento
    if (!metodosDePagamento[metodoDePagamento]) {
      return { erro: "Forma de pagamento inválida!" };
    }

    // verificar se existem itens no carrinho
    if (itens?.length === 0) {
      return { erro: "Não há itens no carrinho de compra!" };
    }

    return null;
  }

  carrinho(metodoDePagamento, itens) {
    const cardapio = new Cardapio().get();
    const carrinho = new Map();
    const metodosDePagamento = this.getMetodosDePagamento();

    // verificar se os itens estão no cardápio e adicionar ao carrinho
    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");

      const verificarCardapio = cardapio.find((item) => item.codigo === codigo);

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

    for (const itemCardapio of cardapio) {
      if (carrinho.has(itemCardapio.codigo)) {
        valorTotal += itemCardapio.valor * carrinho.get(itemCardapio.codigo);
      }
    }

    // Aplicar o desconto ou acrescimo
    valorTotal *= metodosDePagamento[metodoDePagamento];

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
