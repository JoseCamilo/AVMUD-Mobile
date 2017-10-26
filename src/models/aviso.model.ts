export class Aviso {
    
    _id: number;
    title: string;
    comentario: string;
    
    static adatp(): Aviso {
        let aviso = new Aviso();
        aviso.title = "";
        aviso.comentario = "";
        return aviso;
    }    
}