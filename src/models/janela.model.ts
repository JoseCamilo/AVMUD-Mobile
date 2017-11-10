export class Janela {    
    
       
    _id: string;
    title: string;
    status: string;
    idProduto: [string];
    fase: string;
    idPam: string;
    Result: string;
    idAmbiente: string;
    
    static adatp(): Janela {
        let janela = new Janela();
        janela.title = "";
        janela.status = "";
        janela.idProduto = [""];
        janela.fase = "";
        janela.idPam = "";
        janela.Result = "Nunca executado";
        janela.idAmbiente = "";
        return janela;
    }

    Janela(id: string, title: string, status: string, idProduto: [string], fase: string, Result: string ): Janela{
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