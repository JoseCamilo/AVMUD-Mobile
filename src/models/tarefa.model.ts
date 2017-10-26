export class Tarefa {
    
    _id: string;
    idMudanca: number;
    type: string;
    path: string;
    field: string;
    changeset: string;
    alias: string;
    SX6:{
        x6_var: string,
        x6_conteud:string,
        x6_contspa: string,
        x6_conteng: string
    };
    order: string;
    nickname: string;
    fonte: string;
    consulta: string;
    status: string;
    Result: [{mensagem: string}];

    
    static adatp(): Tarefa {
        let tarefa = new Tarefa();
        tarefa.type = "";
        tarefa.path = "";
        tarefa.field = "";
        tarefa.changeset = "";
        tarefa.alias = "";
        tarefa.SX6 = {x6_var:"",
                        x6_conteud:"",
                        x6_contspa:"",
                        x6_conteng:""};
        tarefa.status = "";
        tarefa.order = "";
        tarefa.nickname = "";
        tarefa.fonte = "";
        tarefa.consulta = "";
        tarefa.status = "";
        tarefa.Result = [{mensagem: ""}]
        return tarefa;
    }    
}

export class SX6 {
    x6_var: string;
    x6_conteud:string;
    x6_contspa: string;
    x6_conteng: string;
}


// TYPES TAREFA
// arquivo: path,
// tabela: alias,
// campo: alias, field,
// indice: alias, order, nickname
// changeset: changeset,
// fonte: changeset, fonte,
// parametro: SX6{},
// gatilho: field, order,
// consultaP: consulta,

        