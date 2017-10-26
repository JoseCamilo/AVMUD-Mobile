export class Mudanca {
    
    _id: string;
    title: string;
    descricao: string;
    status: string;
    responsavel: string;
    contato: string;
    idJanela: number;
    idPAM: string;
    idSubTaskPAM: string;
    Result: [{mensagem: string}];
    
    static adatp(): Mudanca {
        let mudanca = new Mudanca();
        mudanca.title = "";
        mudanca.descricao = "";
        mudanca.status = "";
        mudanca.responsavel = "";
        mudanca.contato = "";
        mudanca.idJanela = 0;
        mudanca.idPAM = "";
        mudanca.idSubTaskPAM = "";
        mudanca.Result = [{mensagem: ""}]
        return mudanca;
    }    
}