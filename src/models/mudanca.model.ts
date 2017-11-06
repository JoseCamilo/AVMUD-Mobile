export class Mudanca {
    
    _id: string;
    title: string;
    descricao: string;
    cliente: string;
    status: string;
    responsavel: string;
    contato: string;
    idJanela: number;
    idPAM: string;
    idSubTaskPAM: string;
    empresa: [{codigo: string, titulo: string}];
    ambiente: [{codigo: string, titulo: string}];
    Result: string;
    
    static adatp(): Mudanca {
        let mudanca = new Mudanca();
        mudanca.title = "";
        mudanca.descricao = "Incidente: \nSolução: ";
        mudanca.status = "";
        mudanca.responsavel = "";
        mudanca.contato = "";
        mudanca.idJanela = 0;
        mudanca.idPAM = "";
        mudanca.idSubTaskPAM = "";
        mudanca.empresa = [{codigo: "", titulo: ""}];
        mudanca.ambiente = [{codigo: "", titulo: ""}];
        mudanca.Result = "";
        return mudanca;
    }    
}