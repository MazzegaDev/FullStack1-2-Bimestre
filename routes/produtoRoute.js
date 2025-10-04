const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');

const produtoRouter = express.Router();

let ctrl = new ProdutoController
produtoRouter.get('/', ctrl.listarView);
produtoRouter.get('/cadastro', ctrl.cadastroView);
produtoRouter.post("/cadastro", ctrl.cadastrarProduto);
produtoRouter.post("/excluir", ctrl.excluirProduto);
produtoRouter.get("/alterar/:id", ctrl.alterarView);
produtoRouter.post("/alterar", ctrl.alterarProduto);

module.exports = produtoRouter;