export class Ambiente {
    
    _id: string;
    title: string;
    producao: string;
    preprod: string;
    homolog: string;
    
    static adatp(): Ambiente {
        let ambiente = new Ambiente();
        ambiente.title = "";
        ambiente.producao = "";
        ambiente.preprod = "";
        ambiente.homolog = "";
        return ambiente;
    }    
}