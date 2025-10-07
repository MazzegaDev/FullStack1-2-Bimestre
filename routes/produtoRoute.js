const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');

const produtoRouter = express.Router();
const upload = multer({});


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