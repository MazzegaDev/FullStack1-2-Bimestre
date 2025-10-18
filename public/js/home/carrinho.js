document.addEventListener("DOMContentLoaded", function () {
    const btnCarrinho = document.querySelectorAll("#btnCarrinho");

    btnCarrinho.forEach((element) => {
        element.addEventListener("click", adicionar);
    });
});

function adicionar() {
    const cardItem = this.closest("#card-div");

    const nomeProduto = cardItem.querySelector("#nomeProduto").textContent.trim();
    const precoProduto = cardItem.querySelector("#precoProduto").textContent.trim();
    const nomeCat = cardItem.querySelector("#catProduto").textContent.trim();
    const nomeMarca = cardItem.querySelector("#marcProduto").textContent.trim();
    const imgProduto = cardItem.querySelector("#img").src;

    // cria objeto do produto
    const produto = {
        nome: nomeProduto,
        preco: precoProduto,
        categoria: nomeCat,
        marca: nomeMarca,
        imagem: imgProduto,
    };

    alert("Produto adicionado ao carrinho!");
    //Aqui pegamos o conteudo do LS e transformamos em um obj, se nao tiver nada criamos um array vazio
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    //Colocamos o obj dentro do array que sera enviado ao LS
    carrinho.push(produto);

    //Aqui adicionamos o carrinho no localStorage, detalhe que precissamos stringificar o nosso objeto pois o LS so aceita strings
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
