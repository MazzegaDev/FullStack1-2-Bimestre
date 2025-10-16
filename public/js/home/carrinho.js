document.addEventListener("DOMContentLoaded", function () {
  const btnCarrinho = document.querySelectorAll("#btnCarrinho");

  btnCarrinho.forEach((element) => {
    element.addEventListener("click", adicionar);
  });
});

function adicionar() {
  const card = botao.closest(".card"); // pega o card pai do botão

  const nomeProduto = card.querySelector(".nomeProduto").innerText;
  const precoProduto = card.querySelector(".precoProduto").innerText;
  const nomeCat = card.querySelector(".catNome").innerText;
  const nomeMarca = card.querySelector(".marcaNome").innerText;
  const imgProduto = card.querySelector("img").src;

  //Aqui pegamos o conteudo do LS e transformamos em um obj, se nao tiver nada criamos um array vazio
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const produto = {
    nomeProduto: nomeProduto,
    precoProduto: precoProduto,
    nomeCat: nomeCat,
    nomeMarca: nomeMarca,
    imgProduto: imgProduto,
  };

  //Colocamos o obj dentro do array que sera enviado ao LS
  carrinho.push(produto);

  //Aqui adicionamos o carrinho no localStorage, detalhe que precissamos stringificar o nosso objeto pois o LS so aceita strings
  localStorage.setItem("carrinho", JSON.stringify(carrinho));


}
