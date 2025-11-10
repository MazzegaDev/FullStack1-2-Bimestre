const PedidoItemModel = require("../models/pedidoItemModel");
const PedidoModel = require("../models/pedidoModel");
const ProdutoModel = require("../models/produtoModel");

class PedidosController {
    async gravar(req, res) {
        console.log(req.body);
        let ok = false;
        let msg = "";

        //processo de grvação do pedido
        //Verfica se o carrinho enviou algum pedido
        if (req.body.length > 0) {
            let itensPedido = req.body;
            let pedidoModel = new PedidoModel();
            //Retorna o ID do pedido gerado
            let pedidoId = await pedidoModel.gravar();
            if (pedidoId > 0) {
                let produtoModel = new ProdutoModel();
                //Itera sobre a quantidade de itens do pedido
                for (let i = 0; i < itensPedido.length; i++) {
                    //Pega o id do produto no itensPedido
                    let produtoId = itensPedido[i].id;
                    //Procura se o produto existe
                    let produtoEncontrado = await produtoModel.buscarProduto(
                        produtoId
                    );

                    if (produtoEncontrado != null) {
                        //Verifica o estoque
                        let quantidadeEstoque =
                            produtoEncontrado.produtoQuantidade;
                        if (itensPedido[i].quantidade <= quantidadeEstoque) {
                            //itensPedido = oque queremos comprar, produto que veio do carrinho
                            let itemPedidoModel = new PedidoItemModel();
                            itemPedidoModel.produtoId = produtoId; //Id do produto que veio do carrinho
                            itemPedidoModel.pedidoId = pedidoId; // Id do pedido gerado - pedidoId = await pedidoModel.gravar()lastinserted
                            itemPedidoModel.pedidoItemValor =
                                produtoEncontrado.produtoPreco;
                            itemPedidoModel.pedidoItemQuantidade =
                                itensPedido[i].quantidade;
                            itemPedidoModel.pedidoItemValorTotal =
                                produtoEncontrado.produtoPreco *
                                itensPedido[i].quantidade;

                            //Construa também a baixa de estoque e o valor total, que deve ser feita após a gravação dos itens do pedido
                            let valorTotal = 0
                            valorTotal += produtoEncontrado.produtoPreco * itensPedido[i].quantidade;
                            


                            let estoqueProduto =
                                produtoEncontrado.produtoQuantidade;
                            let estoqueBaixa =
                                estoqueProduto -
                                itemPedidoModel.pedidoItemQuantidade;
                            let prdModel = new ProdutoModel();
                            let prdId = produtoEncontrado.produtoId;
                            if ( await prdModel.baixaEstoque(prdId, estoqueBaixa)) {
                                if(await pedidoModel.finalizarValor(valorTotal)){
                                    await itemPedidoModel.gravar();
                                
                                }else{
                                    ok = false;
                                    msg = "Não foi possivel definir o valor final"
                                }
                                
                            } else {
                                ok = false;
                                msg = `Não foi possivel dar baixa no estoque.`;
                            }
                        } else {
                            ok = false;
                            msg = `Quantidade em estoque insuficiente para o produto ${produtoEncontrado.produtoNome}`;
                        }
                    }
                }

                ok = true;
                msg = "Pedido gravado com sucesso!";
            } else {
                ok = false;
                msg = "Erro ao gerar pedido!";
            }
        } else {
            ok = false;
            msg = "Não há produtos no carrinho!";
        }

        res.send({ ok: ok, msg: msg });
    }
}

module.exports = PedidosController;
