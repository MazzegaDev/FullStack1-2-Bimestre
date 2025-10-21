const MarcaModel = require("../models/marcaModel");

class MarcaController {

    async listarView(req, res) {
        let marca = new MarcaModel();
        let lista = await marca.listarMarcas();
        res.render('marca/listar', {lista: lista});
    }

    cadastroView(req, res){
        res.render("marca/cadastrar");
    }

    async cadastrarMarca(req, res){
        let nomeMarca = req.body.nomeMarca;
        let ok = true;

        if(nomeMarca != null){
            let marca = new MarcaModel(0, nomeMarca);
            ok = await marca.cadastrarMarca();
        }else{
            ok = false
        }
        res.send({ok: ok});
    }
}

module.exports = MarcaController;