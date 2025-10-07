document.addEventListener("DOMContentLoaded", function () {
  var btnGravar = document.getElementById("btnGravar");

  btnGravar.addEventListener("click", gravarProduto);

  //Pega o input da imagem
  let inpArquivo = document.getElementById("inputImagem");

  inpArquivo.addEventListener("change", previa);
  //Quando o arquivo for carregado vai chamar a previa
});

function previa() {
  console.log(this.files);
  //Verifica se tem arquivo
  if (this.files.length > 0) {
    //Div aonde ira aparecer a imagem
    let img = document.getElementById("previaImagem");

    //Cria uma url apartir da imagem inserida no arquivo
    let urlImg = URL.createObjectURL(this.files[0]);

    //A imagem recebe a ulr criada
    img.src = urlImg;

    document.getElementById("divPrevia").style.display = "block";
  }
}

function gravarProduto() {
  var inputCodigo = document.getElementById("inputCodigo");
  var inputNome = document.getElementById("inputNome");
  var inputImagem = document.getElementById("inputImagem");
  var inputQtde = document.getElementById("inputQtde");
  var selMarca = document.getElementById("selMarca");
  var selCategoria = document.getElementById("selCategoria");

  //if de validação básica
  if (
    inputCodigo.value != "" &&
    inputNome.value != "" &&
    inputQtde.value != "" &&
    inputQtde.value != "0" &&
    selMarca.value != "0" &&
    selCategoria.value != "0" &&
    inputImagem.files.length > 0
  ) {
    /*var data = {
            codigo: inputCodigo.value,
            nome: inputNome.value,
            quantidade: inputQtde.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/

    //Transforma o objeto generico data para um obj serializado
    let formData = new FormData();
    formData.append("codigo", inputCodigo.value);
    formData.append("nome", inputNome.value);
    formData.append("quantidade", inputQtde.value);
    formData.append("marca", selMarca.value);
    formData.append("categoria", selCategoria.value);
    formData.append("imagem", inputImagem.files[0]);

    fetch("/produto/cadastro", {
      method: "POST",
      /*headers: {
        "Content-Type": "multipart/form-data",
      },*/
      body: formData,
    })
      .then((r) => {
        return r.json();
      })
      .then((r) => {
        if (r.ok) {
          alert("Produto cadastrado!");
        } else {
          alert("Erro ao cadastrar produto");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Preencha todos os campos corretamente!");
    return;
  }
}
