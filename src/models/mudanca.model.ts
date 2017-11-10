export class Mudanca {
    
    _id: string;
    title: string;
    descricao: string;
    cliente: string;
    status: string;
    responsavel: string;
    contato: string;
    idJanela: string;
    idPAM: string;
    idSubTaskPAM: string;
    empresa: [string];
    ambiente: [string];
    Result: string;
    
    static adatp(): Mudanca {
        let mudanca = new Mudanca();
        mudanca.title = "";
        mudanca.descricao = "Incidente: \nSolução: ";
        mudanca.status = "";
        mudanca.responsavel = "";
        mudanca.contato = "";
        mudanca.idJanela = "";
        mudanca.idPAM = "";
        mudanca.idSubTaskPAM = "";
        mudanca.empresa = [""];
        mudanca.ambiente = [""];
        mudanca.Result = "";
        return mudanca;
    }    
}