const express = require("express");
const MarcaController = require("../controllers/marcaController");
const multer = require("multer");
const upload = multer();

const marcaRouter = express.Router();

let ctrl = new MarcaController();
marcaRouter.get("/", ctrl.listarView);
marcaRouter.get("/cadastrar", ctrl.cadastroView);
marcaRouter.post("/cadastrar", upload.none(),ctrl.cadastrarMarca);

module.exports = marcaRouter;
