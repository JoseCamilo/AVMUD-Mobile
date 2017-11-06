export class Produto {
    
    _id: string;
    title: string;

    show: boolean;
    
    static adatp(): Produto {
        let produto = new Produto();
        produto.title = "";
        produto.show = false;
        return produto;
    }    
}