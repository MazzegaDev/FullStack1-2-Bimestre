const Database = require("../db/database");

const conexao = new Database();
class ProdutoModel {
  #produtoId;
  #produtoCodigo;
  #produtoNome;
  #produtoQuantidade;
  #produtoPreco;
  #categoriaId;
  #categoriaNome;
  #marcaId;
  #marcaNome;
  #produtoImagem;

  get produtoPreco(){
    return this.#produtoPreco
  }
  set produtoPreco(preco){
    this.#produtoPreco = preco;
  }
  get produtoId() {
    return this.#produtoId;
  }
  set produtoId(produtoId) {
    this.#produtoId = produtoId;
  }
  get produtoCodigo() {
    return this.#produtoCodigo;
  }
  set produtoCodigo(produtoCodigo) {
    this.#produtoCodigo = produtoCodigo;
  }
  get produtoNome() {
    return this.#produtoNome;
  }
  set produtoNome(produtoNome) {
    this.#produtoNome = produtoNome;
  }
  get produtoQuantidade() {
    return this.#produtoQuantidade;
  }
  get produtoImagem() {
    return this.#produtoImagem;
  }
  set produtoQuantidade(produtoQuantidade) {
    this.#produtoQuantidade = produtoQuantidade;
  }
  get categoriaId() {
    return this.#categoriaId;
  }
  set categoriaId(categoriaId) {
    this.#categoriaId = categoriaId;
  }
  get categoriaNome() {
    return this.#categoriaNome;
  }
  set categoriaNome(categoriaNome) {
    this.#categoriaNome = categoriaNome;
  }
  get marcaId() {
    return this.#marcaId;
  }
  set marcaId(marcaId) {
    this.#marcaId = marcaId;
  }
  get marcaNome() {
    return this.#marcaNome;
  }
  set marcaNome(marcaNome) {
    this.#marcaNome = marcaNome;
  }
  get produtoImagem() {
    return this.#produtoImagem;
  }
  set produtoImagem(bin) {
    this.#produtoImagem = bin;
  }

  constructor(
    produtoId,
    produtoCodigo,
    produtoNome,
    produtoQuantidade,
    produtoPreco,
    categoriaId,
    marcaId,
    categoriaNome,
    marcaNome,
    produtoImagem
  ) {
    this.#produtoId = produtoId;
    this.#produtoCodigo = produtoCodigo;
    this.#produtoNome = produtoNome;
    this.#produtoQuantidade = produtoQuantidade;
    this.#produtoPreco = produtoPreco
    this.#categoriaId = categoriaId;
    this.#categoriaNome = categoriaNome;
    this.#marcaId = marcaId;
    this.#marcaNome = marcaNome;
    this.#produtoImagem = produtoImagem;
  }

  async excluir(codigo) {
    let sql = "delete from tb_produto where prd_id = ?";
    let valores = [codigo];

    var result = await conexao.ExecutaComandoNonQuery(sql, valores);

    return result;
  }

  async gravar() {
    //Se o metodo nao encotrar id é um cadastro (sem o input hiden)
    if (this.#produtoId == 0) {
      let sql =
        "insert into tb_produto (prd_cod, prd_nome, prd_quantidade, prd_preco, cat_id, mar_id, prd_imagem) values (?, ?, ?, ?, ?, ?, ?)";

      let valores = [
        this.#produtoCodigo,
        this.#produtoNome,
        this.#produtoQuantidade,
        this.#produtoPreco,
        this.#categoriaId,
        this.#marcaId,
        this.#produtoImagem,
      ];

      return await conexao.ExecutaComandoNonQuery(sql, valores);
    } else {
      //caso encontre um id é alteração
      //alterar
      let sql =
        "update tb_produto set prd_cod = ?, prd_nome =?, prd_quantidade= ?, prd_preco = ?, cat_id = ?, mar_id = ?, prd_imagem = ?  where prd_id = ?";

      let valores = [
        this.#produtoCodigo,
        this.#produtoNome,
        this.#produtoQuantidade,
        this.#produtoPreco,
        this.#categoriaId,
        this.#marcaId,
        this.#produtoImagem,
        this.#produtoId,
      ];

      return (await conexao.ExecutaComandoNonQuery(sql, valores)) > 0;
    }
  }

  async buscarProduto(id) {
    let sql = "select * from tb_produto where prd_id = ? order by prd_id";
    let valores = [id];
    var rows = await conexao.ExecutaComando(sql, valores);

    let produto = null;

    if (rows.length > 0) {
      var row = rows[0];
      //Transforma a imagem do produto encontrado em B64 para ser exibida
      //let imgB64 = "";
      //if (row["prd_imagem"] != null) {
        //imgB64 =
          //  "data:image/jpg;base64," + row["prd_imagem"].toString("base64");
      //}

      //Metodo com imagem local
        let img = "";
        if(row["prd_imagem"] != null){ // Verifica se o produto tem imagem para ser listado
          //Nossa variavel global da pasta de imagem
          img = global.CAMINHO_IMG + row["prd_imagem"] // se o produto tem imagem a gente estrutura a imagem com o caminho do produto salvo
          //Ex /img/produtosPRD-1712372378 isso sera lido no html e carregado a devida imagem
        }else{
          img = global.CAMINHO_IMG + "produto-sem-imagem.webp"; //Caso o produto nao tenha imagem ele recebe a img padrao
        }

      produto = new ProdutoModel(
        row["prd_id"],
        row["prd_cod"],
        row["prd_nome"],
        row["prd_quantidade"],
        row["prd_preco"],
        row["cat_id"],
        row["mar_id"],
        "",
        "",
        img
        //imgB64 //Estrutura o produto com o B64
      );

    }

    return produto;
  }

  async buscarCodigo(codigo) {
    let sql = "select * from tb_produto where prd_codigo = ? order by prd_id";
    let valores = [codigo];
    var rows = await conexao.ExecutaComando(sql, valores);

    let produto = null;

    if (rows.length > 0) {
      var row = rows[0];
      //Transforma a imagem do produto encontrado em B64 para ser exibida
      //let imgB64 = "";
      //if (row["prd_imagem"] != null) {
        //imgB64 =
          //  "data:image/jpg;base64," + row["prd_imagem"].toString("base64");
      //}

      //Metodo com imagem local
        let img = "";
        if(row["prd_imagem"] != null){ // Verifica se o produto tem imagem para ser listado
          //Nossa variavel global da pasta de imagem
          img = global.CAMINHO_IMG + row["prd_imagem"] // se o produto tem imagem a gente estrutura a imagem com o caminho do produto salvo
          //Ex /img/produtosPRD-1712372378 isso sera lido no html e carregado a devida imagem
        }else{
          img = global.CAMINHO_IMG + "produto-sem-imagem.webp"; //Caso o produto nao tenha imagem ele recebe a img padrao
        }

      produto = new ProdutoModel(
        row["prd_id"],
        row["prd_cod"],
        row["prd_nome"],
        row["prd_quantidade"],
        row["prd_preco"],
        row["cat_id"],
        row["mar_id"],
        "",
        "",
        img
        //imgB64 //Estrutura o produto com o B64
      );

    }

    return produto;
  }


  async listarProdutos() {
    let sql =
      "select * from tb_produto p inner join tb_categoria c on p.cat_id = c.cat_id inner join tb_marca m on p.mar_id = m.mar_id order by prd_id";

    var rows = await conexao.ExecutaComando(sql);

    let listaRetorno = [];

    if (rows.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        var row = rows[i];
        
        //Metodo com imagem binaria
        //Converter a imagem | bin -> base64
        /*let imgB64 = "";
        if (row["prd_imagem"] != null) {
          imgB64 =
            "data:image/png;base64," + row["prd_imagem"].toString("base64");
        }*/

        //Metodo com imagem local
        let img = "";
        if(row["prd_imagem"] != null){ // Verifica se o produto tem imagem para ser listado
          //Nossa variavel global da pasta de imagem
          img = global.CAMINHO_IMG + row["prd_imagem"] // se o produto tem imagem a gente estrutura a imagem com o caminho do produto salvo
          //Ex /img/produtosPRD-1712372378 isso sera lido no html e carregado a devida imagem
        }else{
          img = global.CAMINHO_IMG + "produto-sem-imagem.webp"; //Caso o produto nao tenha imagem ele recebe a img padrao
        }
        

        listaRetorno.push(
          new ProdutoModel(
            row["prd_id"],
            row["prd_cod"],
            row["prd_nome"],
            row["prd_quantidade"],
            row["prd_preco"],
            row["cat_id"],
            row["mar_id"],
            row["cat_nome"],
            row["mar_nome"],
            img

          )
        );
      }
    }

    return listaRetorno;
  }
}

module.exports = ProdutoModel;
