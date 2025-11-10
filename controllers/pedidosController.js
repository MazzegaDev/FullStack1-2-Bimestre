const PedidoItemModel = require("../models/pedidoItemModel");
const PedidoModel = require("../models/pedidoModel");
const ProdutoModel = require("../models/produtoModel");



class PedidosController {


    async gravar(req, res) {
        console.log(req.body);
        let ok = false;
        let msg = "";

        //processo de grvação do pedido
        if(req.body.length > 0) {
            let itensPedido = req.body;
            let pedidoModel = new PedidoModel();
            let pedidoId = await pedidoModel.gravar();
            if(pedidoId > 0) {
                let produtoModel = new ProdutoModel();
                for(let i = 0; i < itensPedido.length; i++) {
                    let produtoId = itensPedido[i].id;
                    let produtoEncontrado = await produtoModel.buscarProduto(produtoId);
                    if(produtoEncontrado != null) {
                        let itemPedidoModel = new PedidoItemModel();
                        itemPedidoModel.produtoId = produtoId;
                        itemPedidoModel.pedidoId = pedidoId;
                        itemPedidoModel.pedidoItemValor = produtoEncontrado.produtoPreco;
                        itemPedidoModel.pedidoItemQuantidade = itensPedido[i].quantidade;
                        itemPedidoModel.pedidoItemValorTotal = produtoEncontrado.produtoPreco * itensPedido[i].quantidade;

                        await itemPedidoModel.gravar();

                        
                    }
                }

                ok = true;
                msg = "Pedido gravado com sucesso!";
            }
            else {
                ok = false;
                msg = "Erro ao gerar pedido!";
            }
        }
        else {
            ok = false;
            msg = "Não há produtos no carrinho!";
        }

        res.send({ok: ok, msg: msg});
    }
}

module.exports = PedidosController;