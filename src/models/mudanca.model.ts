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
        mudanca.descricao = "Incidente: \n" + 
                            "Solução: \n\n" + 
                            "Inclusão ou alteração de novo CH do Padrão:\n" +  
                            "(  ) SIM  /  ( x ) Não \n\n" +
                            "Evidência de teste: \n\n" + 
                            "Aplicar no MI: \n" +
                            "( x ) Aplicar (  ) Não Replicar \n\n" +
                            "Impacto no MI: \n" +
                            "(  )SIM ( x )NÃO \n\n" +
                            "Testes no MI: \n" +
                            "( x )SIM (  )NÃO";
                            
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