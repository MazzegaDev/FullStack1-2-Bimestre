const Database = require("../db/database");

const banco = new Database();

class PedidoModel {

    #pedidoId;
    #pedidoData;
    #valorTotal;


    get pedidoId() {
        return this.#pedidoId;
    }
    set pedidoId(pedidoId){
        this.#pedidoId = pedidoId;
    }
    set valorTotal(vtotal){
        this.#valorTotal = vtotal;
    }


    get pedidoData() {
        return this.#pedidoData;
    }
    get valorTotal(){
        return this.#valorTotal;
    }
    set pedidoData(pedidoData){
        this.#pedidoData = pedidoData;
    }

    constructor(pedidoId, pedidoData) {
        this.#pedidoId = pedidoId;
        this.#pedidoData = pedidoData;
    }

    async listar() {
        let sql = "select * from tb_pedido";

        let valores = [];

        let rows = await banco.ExecutaComando(sql, valores);

        let listaPedidos = [];

        for(let i =0; i< rows.length; i++) {
            let row = rows[i];
            listaPedidos.push(new PedidoModel(row["ped_id"], row["ped_data"]));
        }

        return listaPedidos;
    }

    async gravar() {
        let sql = "insert into tb_pedido (ped_data, ped_valorTotal) values (now(), null)";     
        let valores = [];
        
        let result = await banco.ExecutaComandoLastInserted(sql, valores);

        return result;
    }

    async finalizarValor(ped_id, valor){
        const sql = "update tb_pedido set ped_valorTotal = ? where ped_id = ?";
        const values = [valor, ped_id];

        const result = await banco.ExecutaComandoNonQuery(sql, values);
        return result;
    }

}

module.exports = PedidoModel;