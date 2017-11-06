export class Ambiente {
    
    _id: string;
    title: string;
    idProduto: string;
    fase: string;
    endereco: string;
    
    static adatp(): Ambiente {
        let ambiente = new Ambiente();
        ambiente.title = "";
        ambiente.idProduto = "";
        ambiente.fase = "";
        ambiente.endereco = "";
        return ambiente;
    }    
}