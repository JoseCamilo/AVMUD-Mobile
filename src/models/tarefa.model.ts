export class Tarefa {
    
    _id: string;
    idMudanca: string;
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
    ordem: string;
    nickname: string;
    fonte: string;
    consulta: string;
    status: string;
    collection: string;
    filial: string;
    Result: [{mensagem: string}];
    empresa: [string];
    ambiente: [string];

    
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
        tarefa.ordem = "";
        tarefa.nickname = "";
        tarefa.fonte = "";
        tarefa.consulta = "";
        tarefa.status = "";
        tarefa.collection = "";
        tarefa.filial = "";
        tarefa.Result = [{mensagem: ""}];
        tarefa.empresa = [""];
        tarefa.ambiente = [""];
        return tarefa;
    }    
}

export class SX6 {
    x6_var: string;
    x6_conteud:string;
    x6_contspa: string;
    x6_conteng: string;
}
        

        