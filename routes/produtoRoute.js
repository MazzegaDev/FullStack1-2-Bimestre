const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');

const produtoRouter = express.Router();

//Salvando as imagens localmente -> Pasta public
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //Erro, string se refenciando aonde vai estar a imagem
        cb(null, "public/img/produtos")
    },
    filename: function(req, file, cb){
        //Gera um nome de arquivo com o prefixo PRD + a hora atual
        let nomeArq = "PRD-" + Date.now();
        
        //Pega a extensao do arquivo 
        let ext = file.originalname.split('.').pop();
        cb(null, `${nomeArq}.${ext}`);
    }
})

//Faz o multer ter acesso o armazenamento de imagens
const upload = multer({storage: storage});

let ctrl = new ProdutoController
produtoRouter.get('/', ctrl.listarView);
produtoRouter.get('/cadastro', ctrl.cadastroView);

// upload.single("imagem")-> como está referenciada nossa imagem no form data
// formData.append("imagem", inputImagem.files[0]);

produtoRouter.post("/cadastro", upload.single("imagem"), ctrl.cadastrarProduto);
produtoRouter.post("/excluir", ctrl.excluirProduto);
produtoRouter.get("/alterar/:id", ctrl.alterarView);
produtoRouter.post("/alterar", upload.single("imagem"),ctrl.alterarProduto);

module.exports = produtoRouter;