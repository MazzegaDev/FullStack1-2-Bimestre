const ProdutoModel = require("../models/produtoModel");
class HomeController {

    async homeView(req, res) {

        let prod = new ProdutoModel();
        let lista = await prod.listarProdutos();

        res.render('home/index', {layout: false, lista: lista});
    }
}


module.exports = HomeController;