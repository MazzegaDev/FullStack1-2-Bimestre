document.addEventListener("DOMContentLoaded", () => {
    const btnGravar = document.querySelector("#btnGravar");

    btnGravar.addEventListener("click", gravar);
});

function gravar() {
    let nomeMarca = document.querySelector("#nomeMarca");
    if (nomeMarca.value != "") {

        let formData = new FormData();
        formData.append("nomeMarca", nomeMarca.value);
        
        fetch("/marcas/cadastrar", {
            method: "POST",
            body: formData,
        })
            .then((r) => {
                return r.json();
            })
            .then((r) => {
                if (r.ok) {
                    alert("Marca cadastrado.");
                } else {
                    alert("Erro ao cadastrar a Marca.");
                }
            });
    } else {
        alert("Preencha os campos corretamentes");
    }
}
