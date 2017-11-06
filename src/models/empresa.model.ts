export class Empresa {
    
    _id: string;
    title: string;
    idProduto: string;
    codSM0: string;
    envServer: string;
    
    static adatp(): Empresa {
        let empresa = new Empresa();
        empresa.title = "";
        empresa.idProduto = "";
        empresa.codSM0 = "";
        empresa.envServer = "";
        return empresa;
    }    
}   