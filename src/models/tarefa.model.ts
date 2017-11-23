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
    colection: string;
    filial: string;
    Result: [{mensagem: string}];
    empresa: [string];
    ambiente: [string];
    arquivo: [string];
    atributo: string;
    valor: string;

    
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
        tarefa.colection = "";
        tarefa.filial = "";
        tarefa.Result = [{mensagem: ""}];
        tarefa.empresa = [""];
        tarefa.ambiente = [""];
        tarefa.arquivo = [""];
        tarefa.atributo = "";
        tarefa.valor = "";
        return tarefa;
    }    
}    