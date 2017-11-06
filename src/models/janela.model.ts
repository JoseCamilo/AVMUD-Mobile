export class Janela {    
    
       
    _id: number;
    title: string;
    status: string;
    idProduto: [{codigo: string, titulo: string}];
    fase: string;
    idPAM: string;
    Result: string;
    idAmbiente: string;
    
    static adatp(): Janela {
        let janela = new Janela();
        janela.title = "";
        janela.status = "";
        janela.idProduto = [{codigo: "", titulo: ""}];
        janela.fase = "";
        janela.idPAM = "";
        janela.Result = "Nunca executado";
        janela.idAmbiente = "";
        return janela;
    }

    Janela(id: number, title: string, status: string, idProduto: [{codigo: string, titulo: string}], fase: string, Result: string ): Janela{
        let janela = new Janela();
        janela._id = id;
        janela.title = title;
        janela.status = status;
        janela.idProduto = idProduto;
        janela.fase = fase;
        janela.Result = Result;
    
        
        return janela;
    }
}