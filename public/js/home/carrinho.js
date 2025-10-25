document.addEventListener("DOMContentLoaded", function () {
    let carrinho = [];
    if (localStorage.getItem("carinho") != null) {
        let carinhoSerializado = localStorage.getItem("carrinho");
        carrinho = JSON.parse(carinhoSerializado);
    }

    let cont = document.getElementById("contador");

    cont.innerHTML = carrinho.length;

    document.addEventListener("show.bs.modal", renderModal);



    let btn = document.querySelectorAll(".addCarrinho");

    btn.forEach((element) => {
        element.addEventListener("click", adicionarCarrinho);
    });

    
    function calcularValor(){
        let soma = 0;
        for(item of carrinho)        {
            soma += (item.quantidade * item.preco);

        }
        document.getElementById("valortotal").innerHTML = `<h3>Valor total: R$ ${soma}</h3>`
    }


    function adicionarCarrinho() {
        /*
            Pega o dataset do botao de carrinho do produto clicado
        */
        let produtoId = this.dataset.produto;
        //Guarda o contexto do this.
        let that = this;

        fetch("/produto/obter/" + produtoId)
            .then(function (cabecalho) {
                return cabecalho.json();
            })
            .then(function (corpo) {
                let produto = corpo.produto;
                //Verifica se algum item do carrinho tem o mesmo id do novo produto
                let produtoCarrinho = carrinho.filter(
                    (x) => x.id == produto.id
                );
                if (produtoCarrinho.length == 0) {
                    produto.quantidade = 1;
                    carrinho.push(produto);
                } else {
                    //Se ja existe aumenta a quantidade
                    produtoCarrinho[0].quantidade += 1;
                }
                //Transforma nosso array carrinho em um json
                localStorage.setItem("carrinho", JSON.stringify(carrinho));
                cont.innerText = carrinho.length;
                that.innerHTML =
                    "<i class='fas fa-check'></i> Produto Adicionado!";
                setTimeout(function () {
                    that.innerHTML = `<i class="bi-cart-fill me-1"></i>
                                        Adicionar ao carrinho`;
                }, 3000);
            });
    }


    function renderModal() {
        let html = "";

        if (carrinho.length > 0) {
            //cabecalho da tabela
            html = `<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Imagem</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Valor unitário</th>                            
                                <th>Valor total</th>
                                <th></th>

                            </tr>
                        </thead>
                        <tbody>`;

            for (let i = 0; i < carrinho.length; i++) {
                html += `<tr>
                                <td><img src="${
                                    carrinho[i].imagem
                                }" width="80" /></td>                     
                                <td>${carrinho[i].nome}</td>
                                <td>
                                    <div style="display:flex; justify-content: space-evenly;">
                                    <button class="btn btn-light"><i class="fas fa-minus"></i></button>
                                    <input class="form-control"  type="text" style="width: 50px;"></input>
                                    <button class="btn btn-light"><i class="fas fa-plus"></i></button>
                                    </div>
                                </td>
                                <td>R$ ${carrinho[i].preco}</td>
                                <td>${
                                    carrinho[i].quantidade * carrinho[i].preco
                                }</td>
                                <td>
                                    <button class="btn btn-danger" ><i class="fas fa-trash"> </i></button>
                                </td>
                            </tr>`;
            }

            html += `   </tbody>
                    </table>`;

            document.querySelector(".modal-body").innerHTML = html;
            calcularValor()
        } else {
            html = "Carrinho vazio!";
        }
    }
});
