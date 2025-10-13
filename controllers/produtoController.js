const CategoriaModel = require("../models/categoriaModel");
const MarcaModel = require("../models/marcaModel");
const ProdutoModel = require("../models/produtoModel");
const fs = require("fs");

class ProdutoController {
  async listarView(req, res) {
    let prod = new ProdutoModel();
    let lista = await prod.listarProdutos();
    res.render("produto/listar", { lista: lista });
  }

  async excluirProduto(req, res) {
    var ok = true;
    if (req.body.codigo != "") {
      let produto = new ProdutoModel();
      ok = await produto.excluir(req.body.codigo);
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }
  //Cadastro de imagem binaria
  /*async cadastrarProduto(req, res){
        console.log(req);
        var ok = true;
        //req.file.buffer <- dentro do atributo buffer é armazenado o blob da imagem
        //OBS: files -> cliente | file -> servidor
        if(req.body.codigo != "" && req.body.nome != "" && 
        req.body.quantidade != "" && req.body.quantidade  != '0' && 
        req.body.marca != '0' && req.body.categoria  != '0' && req.file != null Verificamos aqui se veio algum arquivo) {
            let produto = new ProdutoModel(0, req.body.codigo, 
                req.body.nome, req.body.quantidade, 
                req.body.categoria, req.body.marca, "", "", req.file.buffer Aqui acessamos o binario do arquivo);

            ok = await produto.gravar();
        }
        else{
            ok = false;
        }

        res.send({ ok: ok })
    }*/

  //Cadastro de imagem local
  async cadastrarProduto(req, res) {
    console.log(req);
    var ok = true;
    
    if (
      req.body.codigo != "" &&
      req.body.nome != "" &&
      req.body.quantidade != "" &&
      req.body.preco != "0" &&
      req.body.marca != "0" &&
      req.body.categoria != "0" &&
      req.file != null /*Verificamos aqui se veio algum arquivo*/
    ) {
      let produto = new ProdutoModel(
        0,
        req.body.codigo,
        req.body.nome,
        req.body.quantidade,
        req.body.preco,
        req.body.categoria,
        req.body.marca,
        "",
        "",
        req.file.filename /*Aqui acessamos o nome do arquivo que se remete a sua rota*/
      );

      ok = await produto.gravar();
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async alterarView(req, res) {
    let produto = new ProdutoModel();
    let marca = new MarcaModel();

    let categoria = new CategoriaModel();
    if (req.params.id != undefined && req.params.id != "") {
      produto = await produto.buscarProduto(req.params.id);
    }

    let listaMarca = await marca.listarMarcas();
    let listaCategoria = await categoria.listarCategorias();
    res.render("produto/alterar", {
      produtoAlter: produto,
      listaMarcas: listaMarca,
      listaCategorias: listaCategoria,
    });
  }

  async alterarProduto(req, res) {
    //console.log(req);
    var ok = true;
    if (
      req.body.codigo != "" &&
      req.body.nome != "" &&
      req.body.quantidade != "" &&
      req.body.preco != "0" &&
      req.body.marca != "0" &&
      req.body.categoria != "0" &&
      req.file !=
        null /*Aqui verificamos se o usuario inseriu a nova foto do arquivo*/
    ) {
      let produto = new ProdutoModel(
        req.body.id,
        req.body.codigo,
        req.body.nome,
        req.body.quantidade,
        req.body.preco,
        req.body.categoria,
        req.body.marca,
        "",
        "",
      );
      //Pega o produto antes da alteração, essa nova etapa serve para deletar imagens sem ligação na pasta
      let produtoAntigo = await produto.buscarProduto(req.body.id);
      if(req.file != null){
        //veio imagem
        let nomeImg = produtoAntigo.produtoImagem.split("/").pop();
        //Verifica se o arquivo existe na pasta
        if(fs.existsSync(global.CAMINHO_IMG_ABSOLUTO + nomeImg)){
          //Se o arquivo existe deleta na pasta
          fs.unlinkSync(global.CAMINHO_IMG_ABSOLUTO + nomeImg);
        }
        //O produto recebe a nova referencia da imagem
        produto.produtoImagem = req.file.filename
      }else{
        //nao veio
      }
      ok = await produto.gravar();
    } else {
      ok = false;
    }

    res.send({ ok: ok });
  }

  async cadastroView(req, res) {
    let listaMarcas = [];
    let listaCategorias = [];

    let marca = new MarcaModel();
    listaMarcas = await marca.listarMarcas();

    let categoria = new CategoriaModel();
    listaCategorias = await categoria.listarCategorias();

    res.render("produto/cadastro", {
      listaMarcas: listaMarcas,
      listaCategorias: listaCategorias,
    });
  }
}

module.exports = ProdutoController;
