document.addEventListener("DOMContentLoaded", function(){

    var btnGravar = document.getElementById("btnAlterar");

    btnGravar.addEventListener("click", alterarProduto);

    var inpArquivo = document.getElementById("inputImagem");
    inpArquivo.addEventListener("change", previa)
})

function previa(){
    if(this.files.length > 0){
        let divImg = document.getElementById("previaImagem");

        let urlArq = URL.createObjectURL(this.files[0]);

        divImg.src = urlArq;

        document.getElementById("divPrevia").style.display = "block";
    }
}


function alterarProduto() {

    
    var inputId = document.getElementById("inputId");
    var inputCodigo = document.getElementById("inputCodigo");
    var inputNome = document.getElementById("inputNome");
    var inputQtde = document.getElementById("inputQtde");
    var selMarca = document.getElementById("selMarca");
    var selCategoria = document.getElementById("selCategoria");
    var inputImagem = document.getElementById("inputImagem");

    //if de validação básica
    if(inputCodigo.value != "" && inputNome.value != "" && inputQtde.value != "" && inputQtde.value != '0' && selMarca.value != '0' && selCategoria.value != '0' && inputImagem.files.length > 0){

        /*var data = {
            id: inputId.value,
            codigo: inputCodigo.value,
            nome: inputNome.value,
            quantidade: inputQtde.value,
            marca: selMarca.value,
            categoria: selCategoria.value
        }*/
        let formData = new FormData();
        formData.append("id", inputId.value);
        formData.append("codigo", inputCodigo.value);
        formData.append("nome", inputNome.value);
        formData.append("quantidade", inputQtde.value);
        formData.append("marca", selMarca.value);
        formData.append("categoria", selCategoria.value);
        formData.append("imagem", inputImagem.files[0]);

        fetch('/produto/alterar', {
            method: "POST",
            body: formData
        })
        .then(r => {
            return r.json();
        })
        .then(r=> {
            if(r.ok) {
                alert("Produto alterado!");
            }
            else{
                alert("Erro ao alterar produto");
            }
        })
        .catch(e => {
            console.log(e);
        })

    }
    else{
        alert("Preencha todos os campos corretamente!");
        return;
    }
}