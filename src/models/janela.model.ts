export class Janela {    
    
       
    _id: number;
    title: string;
    status: string;
    idAmbiente: string[];
    //idAmbiente: string;
    fase: string;
    //Result: [{mensagem: string}];
    Result: string;
    
    static adatp(): Janela {
        let janela = new Janela();
        janela.title = "";
        janela.status = "";
        janela.idAmbiente = [];
        //janela.idAmbiente = "";
        janela.fase = "";
        //janela.Result = [{mensagem: ""}];
        janela.Result = "Nunca executado";
        return janela;
    }

    Janela(id: number, title: string, status: string, idAmbiente: string[], fase: string, Result: string ): Janela{
        let janela = new Janela();
        janela._id = id;
        janela.title = title;
        janela.status = status;
        janela.idAmbiente = idAmbiente;
        janela.fase = fase;
        janela.Result = Result;
        
        return janela;
    }
}